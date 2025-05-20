# Sparta Commodities Tech Exam

## Setup and Run Instructions

1. Clone the repository:

   ```bash
   git clone github.com/dean998/sparta-tech-exam
   ```

2. Navigate to the main directory:

   ```bash
   cd sparta-tech-exam
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

5. Start the API & Web Simultaneously using turbo:

   ```bash
   npm run dev
   ```

## Dependencies

- Node.js (v16 or higher)
- SQLite (for development database)
- Prisma (ORM for database management)
- NestJS (backend framework)
- Next.js (frontend framework)
- Tailwind CSS (for styling)

## Assumptions and Notes

- The project uses an in-memory SQLite database for development. Data will not persist between application restarts.
- Ensure Node.js and npm are installed on your system before running the setup.
- The API and web application are designed to run locally for development purposes.
- Clean, functional, and readable code has been prioritized over complex engineering solutions.

- Assumptions: 

- Each trade must include a valid commodity, traderId, price, quantity, and 
  ISO-formatted timestamp.
- Only registered users can create trades on the platform.
- Non-registered users can preview trades and insights on the platform.
- 
