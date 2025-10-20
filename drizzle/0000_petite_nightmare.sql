CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"identifier" varchar(100) NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "users_identifier_unique" UNIQUE("identifier")
);
--> statement-breakpoint
CREATE TABLE "vault" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"site" varchar(100) NOT NULL,
	"encrypted_password" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "vault" ADD CONSTRAINT "vault_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;