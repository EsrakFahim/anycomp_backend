// src/routes/specialist.routes.ts
import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Specialist } from "../entities/Specialist";
import { Media } from "../entities/Media";
import { upload } from "../config/multer";

const router = Router();

router.post(
      "/specialists",
      upload.array("media", 10), // multiple files
      async (req, res) => {
            const queryRunner = AppDataSource.createQueryRunner();

            await queryRunner.connect();
            await queryRunner.startTransaction();
            console.log("call from route");
            try {
                  const {
                        title,
                        description,
                        slug,
                        is_draft,
                        average_rating,
                        total_number_of_reviews,
                        base_price,
                        platform_fee,
                        final_price,
                        verification_status,
                        is_verified,
                        duration_days,
                  } = req.body;

                  // 1. Create specialist
                  const specialist = queryRunner.manager.create(Specialist, {
                        title,
                        description,
                        slug,
                        is_draft: is_draft === "true",
                        average_rating,
                        total_number_of_reviews,
                        base_price,
                        platform_fee,
                        final_price,
                        verification_status,
                        is_verified: is_verified === "true",
                        duration_days,
                  });

                  await queryRunner.manager.save(specialist);

                  // 2. Create media entries
                  if (req.files && Array.isArray(req.files)) {
                        for (let i = 0; i < req.files.length; i++) {
                              const file = req.files[i] as Express.Multer.File;

                              const media = queryRunner.manager.create(Media, {
                                    specialist,
                                    file_name: file.filename,
                                    file_size: file.size,
                                    display_order: i + 1,
                                    mime_type: file.mimetype,
                                    media_type: file.mimetype.startsWith("video")
                                          ? "video"
                                          : file.mimetype === "application/pdf"
                                                ? "pdf"
                                                : "image",
                              });

                              await queryRunner.manager.save(media);
                        }
                  }

                  await queryRunner.commitTransaction();

                  return res.status(201).json({
                        message: "Specialist created successfully",
                        specialist_id: specialist.id,
                  });
            } catch (err) {
                  await queryRunner.rollbackTransaction();
                  console.error(err);
                  return res.status(500).json({ message: "Creation failed" });
            } finally {
                  await queryRunner.release();
            }
      }
);


router.get("/specialists", async (_req, res) => {
      try {
            const specialistRepo = AppDataSource.getRepository(Specialist);

            const { IsNull } = require("typeorm");
            const specialists = await specialistRepo.find({
                  where: { deleted_at: IsNull() },
                  relations: ["media"], // 👈 IMPORTANT
                  order: {
                        created_at: "DESC",
                  },
            });

            return res.json(specialists);
      } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch specialists" });
      }
});


router.get("/specialists/export", async (_req, res) => {
      try {
            const ExcelJS = require("exceljs");
            const specialistRepo = AppDataSource.getRepository(Specialist);
            const specialists = await specialistRepo.find({
                  where: { deleted_at: require("typeorm").IsNull() },
                  order: { created_at: "DESC" },
            });

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Specialists");

            worksheet.columns = [
                  { header: "ID", key: "id", width: 10 },
                  { header: "Title", key: "title", width: 30 },
                  { header: "Description", key: "description", width: 50 },
                  { header: "Final Price", key: "final_price", width: 15 },
                  { header: "Duration (Days)", key: "duration_days", width: 15 },
                  { header: "Verification Status", key: "verification_status", width: 20 },
                  { header: "Is Verified", key: "is_verified", width: 15 },
                  { header: "Is Draft", key: "is_draft", width: 15 },
                  { header: "Created At", key: "created_at", width: 20 },
            ];

            specialists.forEach((specialist) => {
                  worksheet.addRow({
                        id: specialist.id,
                        title: specialist.title,
                        description: specialist.description,
                        final_price: specialist.final_price,
                        duration_days: specialist.duration_days,
                        verification_status: specialist.verification_status,
                        is_verified: specialist.is_verified ? "Yes" : "No",
                        is_draft: specialist.is_draft ? "Yes" : "No",
                        created_at: specialist.created_at,
                  });
            });

            res.setHeader(
                  "Content-Type",
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                  "Content-Disposition",
                  "attachment; filename=specialists.xlsx"
            );

            await workbook.xlsx.write(res);
            res.end();
      } catch (error) {
            console.error("Export failed:", error);
            res.status(500).json({ message: "Failed to export specialists" });
      }
});

export default router;