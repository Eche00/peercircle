"use client";

import React, { useState } from "react";
import { seedDatabase } from "@/utils/seed-collections";
import { Button, CircularProgress, Alert, Snackbar } from "@mui/material";
import { StorageOutlined, CheckCircleOutlined } from "@mui/icons-material";

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setError(null);
    try {
      await seedDatabase();
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to seed database");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-white text-center">
      <div className="w-20 h-20 bg-[#8F4AE3]/10 rounded-3xl flex items-center justify-center text-[#8F4AE3] mb-4">
        <StorageOutlined sx={{ fontSize: 40 }} />
      </div>

      <h1 className="text-3xl font-bold">Database Initialization</h1>
      <p className="text-gray-400 max-w-md">
        Click the button below to initialize all requested Firestore collections
        (`sessions`, `participants`, `userActivity`, etc.) and populate
        `dailyTasks` with sample data.
      </p>

      <Button
        variant="contained"
        onClick={handleSeed}
        disabled={loading}
        startIcon={
          loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <StorageOutlined />
          )
        }
        sx={{
          backgroundColor: "#8F4AE3",
          padding: "12px 32px",
          borderRadius: "12px",
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#7c3fc2",
          },
        }}
      >
        {loading ? "Seeding..." : "Initialize Database"}
      </Button>

      {success && (
        <Alert
          icon={<CheckCircleOutlined fontSize="inherit" />}
          severity="success"
          sx={{ mt: 2, borderRadius: "12px" }}
        >
          Database seeded successfully! You can now view the collections in your
          Firebase Console and the Tasks page.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2, borderRadius: "12px" }}>
          {error}
        </Alert>
      )}

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        message="Seeding Complete"
      />
    </div>
  );
}
