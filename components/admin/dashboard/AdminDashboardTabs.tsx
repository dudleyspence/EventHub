"use client";
import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { IoMdSettings } from "react-icons/io";
import { MdEvent, MdAdminPanelSettings } from "react-icons/md";
import AdminProfileTab from "./AdminProfileTab";
import AdminYourEventsTab from "./AdminYourEventsTab";
import AdminSettingsTab from "./AdminSettingsTab";
import useWindowDimensions from "@/hooks/useWindowDimentions";

export default function AdminDashboardTabs() {
  const { width } = useWindowDimensions();

  return (
    <Tabs
      aria-label="Options"
      color="warning"
      variant="bordered"
      className="mb-10 md:mr-10"
      size="lg"
      isVertical={width > 800}
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
        key="Events"
        title={
          <div className="flex items-center space-x-2">
            <MdEvent size={22} />
            <span>Events</span>
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
            <span>Settings</span>
          </div>
        }
      >
        <AdminSettingsTab />
      </Tab>
    </Tabs>
  );
}
