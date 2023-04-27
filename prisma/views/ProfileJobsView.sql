SELECT p.id AS "profileId",
        j.id AS "jobId",
        p."firstName" AS "firstName",
        p."lastName" AS "lastName",
        p.profession AS profession,
        p.type AS type,
        j."paymentDate" as "paymentDate",
        j.price AS price
    FROM "Profile" p
        LEFT JOIN "Contract" c ON p.id = c."contractorId" OR p.id = c."clientId"
        LEFT JOIN "Job" j ON c.id = j."contractId"
	WHERE j.paid = True