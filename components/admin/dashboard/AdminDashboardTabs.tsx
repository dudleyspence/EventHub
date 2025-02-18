"use client";
import React, { useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import { IoMdSettings } from "react-icons/io";
import { MdEvent, MdAdminPanelSettings } from "react-icons/md";
import AdminProfileTab from "./AdminProfileTab";
import AdminYourEventsTab from "./AdminYourEventsTab";
import AdminSettingsTab from "./AdminSettingsTab";

export default function AdminDashboardTabs() {
  const [isVertical, setIsVertical] = useState(true);

  return (
    <Tabs
      aria-label="Options"
      color="warning"
      variant="bordered"
      className="mr-10"
      size="lg"
      isVertical={isVertical}
    >
      <Tab
        key="Profile"
        title={
          <div className="flex items-center space-x-4">
            <MdAdminPanelSettings size={22} />
            <span>Profile</span>
          </div>
        }
      >
        <AdminProfileTab />
      </Tab>
      <Tab
        key="Your Events"
        title={
          <div className="flex items-center space-x-2">
            <MdEvent size={22} />
            <span>Your Events</span>
          </div>
        }
      >
        <AdminYourEventsTab />
      </Tab>
      <Tab
        key="Admin Settings"
        title={
          <div className="flex items-center space-x-2">
            <IoMdSettings size={22} />
            <span>Admin Settings</span>
          </div>
        }
      >
        <AdminSettingsTab />
      </Tab>
    </Tabs>
  );
}
