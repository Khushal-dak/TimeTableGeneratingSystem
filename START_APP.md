# How to Start the Application

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (v14 or higher)
- ✅ MongoDB installed and running
- ✅ All dependencies installed

## Quick Start (2 Terminals)

### Terminal 1 - Backend Server

```bash
# In project root directory
npm run server
```

Wait for:
```
Server running on port 5000
MongoDB Connected
```

### Terminal 2 - Frontend Server

```bash
# In project root directory
cd client
npm start
```

Browser will automatically open at `http://localhost:3000`

## Alternative: Run Both Simultaneously

If you have `concurrently` installed:

```bash
npm run dev
```

This runs both backend and frontend in one terminal.

## First Time Setup

If this is your first time running the app:

1. **Install Backend Dependencies:**
```bash
npm install
```

2. **Install Frontend Dependencies:**
```bash
cd client
npm install
cd ..
```

3. **Start MongoDB:**
   - Windows: MongoDB should auto-start after installation
   - Or manually: `mongod` command

4. **Configure .env file:**
   - Check `.env` file exists in root
   - Verify MongoDB connection string

5. **Start the servers** (see Quick Start above)

## Verify Everything Works

1. **Backend Check:**
   - Open: `http://localhost:5000`
   - Should see: Cannot GET / (this is normal)

2. **Frontend Check:**
   - Open: `http://localhost:3000`
   - Should see: Home page with navbar

3. **Database Check:**
   - Register a new user
   - If successful, MongoDB is connected!

## Common Issues

### "MongoDB Connection Error"
**Fix:** Start MongoDB service
```bash
# Windows
net start MongoDB

# Or check if mongod is running
```

### "Port 5000 already in use"
**Fix:** Change port in `.env` file or kill the process

### "Cannot find module"
**Fix:** Install dependencies
```bash
npm install
cd client && npm install
```

## Ready to Use!

Once both servers are running:

1. Go to `http://localhost:3000`
2. Click "Register" to create an account
3. Click "Generate Timetable" to start
4. Follow the 6-step wizard
5. Generate and save your timetable!

## Stop the Application

Press `Ctrl + C` in each terminal to stop the servers.

---

**Need Help?** Check `SETUP_GUIDE.md` for detailed instructions.
