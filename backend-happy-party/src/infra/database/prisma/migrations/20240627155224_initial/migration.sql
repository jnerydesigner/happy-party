-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "banner" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "type_party_id" TEXT NOT NULL,

    CONSTRAINT "parties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_parties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "type_parties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list_presents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "party_id" TEXT NOT NULL,

    CONSTRAINT "list_presents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "presents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "list_presents_id" TEXT NOT NULL,

    CONSTRAINT "presents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "married" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "party_id" TEXT,

    CONSTRAINT "married_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "birth_days" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "party_id" TEXT,

    CONSTRAINT "birth_days_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "parties_type_party_id_key" ON "parties"("type_party_id");

-- CreateIndex
CREATE UNIQUE INDEX "list_presents_party_id_key" ON "list_presents"("party_id");

-- CreateIndex
CREATE UNIQUE INDEX "presents_list_presents_id_key" ON "presents"("list_presents_id");

-- CreateIndex
CREATE UNIQUE INDEX "married_party_id_key" ON "married"("party_id");

-- CreateIndex
CREATE UNIQUE INDEX "birth_days_party_id_key" ON "birth_days"("party_id");

-- AddForeignKey
ALTER TABLE "parties" ADD CONSTRAINT "parties_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parties" ADD CONSTRAINT "parties_type_party_id_fkey" FOREIGN KEY ("type_party_id") REFERENCES "type_parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_presents" ADD CONSTRAINT "list_presents_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presents" ADD CONSTRAINT "presents_list_presents_id_fkey" FOREIGN KEY ("list_presents_id") REFERENCES "list_presents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "married" ADD CONSTRAINT "married_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "birth_days" ADD CONSTRAINT "birth_days_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id") ON DELETE SET NULL ON UPDATE CASCADE;
