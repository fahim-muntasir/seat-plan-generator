"use client";

import { useState } from "react";
import FileUpload from "./components/FileUpload";
import SeatPlanDisplay from "./components/SeatPlanDisplay";
import { processExcelData } from "../utils/dataProcessing";
import { Button } from "@/components/ui/button";
import { downloadPDF, downloadExcel } from "../utils/download";
import { School } from "lucide-react";
import { ExampleTemplate } from "./components/ExampleTemplate";
import { Hero } from './components/landing/Hero';
import { Features } from './components/landing/Features';
import { HowItWorks } from './components/landing/HowItWorks';
import { GetStarted } from "./components/landing/GetStarted";

export default function ExamSeatPlanManager() {
  const [seatPlan, setSeatPlan] = useState(null);
  const [roomConfigs, setRoomConfigs] = useState([]);

  const handleFileUpload = (data) => {
    const initialConfig = { name: "Room 1", columns: 4, capacity: 40 };
    const processedData = processExcelData(data, [initialConfig]);
    console.log("processData==", processedData);
    setSeatPlan(processedData);
    setRoomConfigs([initialConfig]);
  };

  const handleRoomConfigChange = (index, newConfig) => {
    const updatedConfigs = [...roomConfigs];
    updatedConfigs[index] = newConfig;
    setRoomConfigs(updatedConfigs);
    if (seatPlan) {
      const reprocessedData = processExcelData(
        seatPlan.originalData,
        updatedConfigs
      );
      setSeatPlan(reprocessedData);
    }
  };

  const handleAddRoom = () => {
    const newConfig = {
      name: `Room ${roomConfigs.length + 1}`,
      columns: 4,
      capacity: 40,
    };
    setRoomConfigs([...roomConfigs, newConfig]);
    if (seatPlan) {
      const reprocessedData = processExcelData(seatPlan.originalData, [
        ...roomConfigs,
        newConfig,
      ]);
      setSeatPlan(reprocessedData);
    }
  };

  const handleRemoveRoom = (index) => {
    const updatedConfigs = roomConfigs.filter((_, i) => i !== index);
    setRoomConfigs(updatedConfigs);
    if (seatPlan) {
      const reprocessedData = processExcelData(
        seatPlan.originalData,
        updatedConfigs
      );
      setSeatPlan(reprocessedData);
    }
  };

  const handleSeatPlanChange = (newSeatPlan) => {
    setSeatPlan(newSeatPlan);
  };

  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />

      <GetStarted handleFileUpload={handleFileUpload} />

      {seatPlan && (
        <div className="container mx-auto mb-8">
          <SeatPlanDisplay
            seatPlan={seatPlan}
            roomConfigs={roomConfigs}
            onConfigChange={handleRoomConfigChange}
            onChange={handleSeatPlanChange}
            onAddRoom={handleAddRoom}
            onRemoveRoom={handleRemoveRoom}
          />
          <div className="mt-4 space-x-2">
            <Button onClick={() => downloadPDF(seatPlan, roomConfigs)}>
              Download PDF
            </Button>
            <Button onClick={() => downloadExcel(seatPlan, roomConfigs)}>
              Download Excel
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
