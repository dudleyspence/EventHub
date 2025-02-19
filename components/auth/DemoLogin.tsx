import { Button } from "@heroui/react";
import React from "react";

export default function DemoLogin({
  handleDemoAdminClick,
  handleDemoUserClick,
}: {
  handleDemoAdminClick: () => void;
  handleDemoUserClick: () => void;
}) {
  return (
    <div className="w-full flex flex-row gap-2">
      <Button onPress={handleDemoAdminClick} fullWidth>
        Demo Admin Login
      </Button>
      <Button onPress={handleDemoUserClick} fullWidth>
        Demo User Login
      </Button>
    </div>
  );
}
