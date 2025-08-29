# BFHL API — Vercel Serverless

## Endpoint
POST /bfhl

## Setup Environment Variables
Set in Vercel project settings:
- FULL_NAME = Your full name
- DOB_DDMMYYYY = ddmmyyyy
- EMAIL_ID = your_email@vitstudent.ac.in
- ROLL_NUMBER = ABCD123

## Deploy
1. Push this folder to GitHub.
2. Import repo in Vercel and deploy.
3. Test:
   curl -X POST https://<project>.vercel.app/bfhl -H "Content-Type: application/json" -d '{"data":["a","1","334","4","R","$"]}'
