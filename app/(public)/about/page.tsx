"use client";

import {
  Diversity3,
  Handshake,
  Visibility,
  VerifiedUser,
  Psychology,
  Gavel,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import Hero from "./Hero";
import CoreValues from "./CoreValues";
import Team from "./Team";

function AboutPage() {


  return (
    <div className="min-h-screen  text-white relative">
      <Hero />
      <CoreValues />
      <Team />

    </div>
  );
}

export default AboutPage;
