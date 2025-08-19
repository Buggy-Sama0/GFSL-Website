

// If this file is run directly (node server.js), start the HTTP server so
// hosting platforms like Render can detect an open port. If it's imported
// (for example by serverless adapters or tests), don't auto-bind the port.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the app for platforms that import it (Vercel) or for tests