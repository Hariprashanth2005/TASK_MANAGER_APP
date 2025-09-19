"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { github, moon, profile } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Header() {
  const { user, logoutUser } = useUserContext();
  const { openModalForAdd, activeTasks } = useTasks();
  const router = useRouter();

  const { name, _id: userId } = user || {};

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);

    // Toggle dark class on <html> root
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); // this should clear cookies/context
      router.push("/login");
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9] dark:bg-gray-800">
      <div>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">👋</span>
          {userId ? `Welcome, ${name}!` : "Welcome to Taskfyer"}
        </h1>
        <p className="text-sm">
          {userId
            ? <>You have <span className="font-bold text-[#3aafae]">{activeTasks.length}</span> active tasks</>
            : "Please login or register to view your tasks"}
        </p>
      </div>

      <div className="h-[50px] flex items-center gap-[10.4rem]">
        <button
          className="px-8 py-3 bg-[#3aafae] text-white rounded-full hover:bg-[#00A1F1] transition duration-200"
          onClick={() => {
            if (userId) {
              openModalForAdd();
            } else {
              router.push("/login");
            }
          }}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button>

        <div className="flex gap-4 items-center">
          {/* GitHub link */}
          <Link
            href="https://github.com/Hariprashanth2005/TASK_MANAGER_APP"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center border-2 border-[#E6E6E6]"
          >
            {github}
          </Link>

          {/* Dark mode toggle */}
          <button
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center border-2 border-[#E6E6E6]"
            onClick={toggleDarkMode}
          >
            {moon}
          </button>

          {/* Profile icon = Logout */}
          {userId && (
            <button
              className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center border-2 border-[#E6E6E6]"
              onClick={handleLogout}
            >
              {profile}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
