INSERT INTO listings
(imageurl, name, description, loan_amount, monthly_mortgage, recommended_rent, desired_rent, address, city, zip, state)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);