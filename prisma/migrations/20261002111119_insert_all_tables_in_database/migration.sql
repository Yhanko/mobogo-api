-- DropForeignKey
ALTER TABLE "location_events" DROP CONSTRAINT "location_events_driver_id_fkey";

-- DropIndex
DROP INDEX "transactions_ticket_id_key";

-- AlterTable
ALTER TABLE "location_events" ADD COLUMN     "user_id" TEXT,
ALTER COLUMN "driver_id" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "location_events_user_id_recorded_at_idx" ON "location_events"("user_id", "recorded_at" DESC);

-- CreateIndex
CREATE INDEX "transactions_ticket_id_idx" ON "transactions"("ticket_id");

-- AddForeignKey
ALTER TABLE "location_events" ADD CONSTRAINT "location_events_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_events" ADD CONSTRAINT "location_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
