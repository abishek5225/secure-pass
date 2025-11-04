CREATE TABLE "groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"created_by" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "passwords" (

);
--> statement-breakpoint
ALTER TABLE "vault" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "vault" CASCADE;--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_identifier_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password_hash" SET DATA TYPE varchar(512);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "identifier";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");