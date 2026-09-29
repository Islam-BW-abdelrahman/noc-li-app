import { createFileRoute } from "@tanstack/react-router";
import {
  Archive,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Columns3,
  Download,
  FileText,
  GitBranch,
  LayoutDashboard,
  LogOut,
  Menu,
  Pencil,
  Search,
  Settings,
  ShieldCheck,
  UserCog,
  UserRoundPlus,
  UsersRound,
  Workflow,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import adminAvatar from "@/assets/admin-avatar.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Employees — HR Admin" },
      { name: "description", content: "Manage employees, contracts, roles, and workforce records." },
      { property: "og:title", content: "Employees — HR Admin" },
      { property: "og:description", content: "A responsive employee management dashboard for HR teams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const employees = [
  ["Administrator", "Admin Officer", "Active", "NOC", "Full-Time", "Feb 1"],
  ["Ahmed Jamal Ali", "DevOps Engineer", "Active", "NOC", "Temporary", "Dec 24"],
  ["Ahmad Khalid", "Software Tester", "Active", "NOC", "Full-Time", "Feb 28 – Apr 21"],
  ["Ahmad Khalid Mahmoud", "Software Tester", "Probation", "Pioneers", "Temporary", "Sep 10"],
  ["Ahmed Omar", "Software Tester", "Active", "Temporary", "Full-Time", "May 4 – Nov 22"],
  ["Ahmed Jamal Al-Marsouri", "System Admin", "On Leave", "NOC", "Full-Time", "Feb 16 – Feb 6"],
  ["Ahmed Mohamed", "System Admin", "Active", "Pioneers", "Temporary", "Apr 6"],
  ["Ahmed Salem Al-Filouri", "NOC Engineer", "Active", "NOC", "Full-Time", "Feb 2"],
  ["Ali Mustafa Al-Zintani", "NOC Manager", "Active", "NOC", "Full-Time", "Feb 6"],
  ["Alison Gerlach II", "HR Manager", "Active", "NOC", "Temporary", "Feb 1 – Jul 21"],
  ["Bahaa Mohammed", "NOC", "Active", "Pioneers", "Temporary", "Mar"],
  ["Basil Mahmoud", "System Admin", "On Leave", "NOC", "Pioneers", "Apr 8"],
];

const navGroups = [
  { label: "", items: [["Analytics", LayoutDashboard]] as const },
  {
    label: "People",
    items: [
      ["Employees", UsersRound],
      ["Organizational Structure", Workflow],
      ["Transfers", GitBranch],
      ["Leaves", CalendarDays],
    ] as const,
  },
  {
    label: "Work",
    items: [
      ["Missions", BriefcaseBusiness],
      ["Projects", Archive],
      ["Assignments", FileText],
    ] as const,
  },
  {
    label: "Lifecycle",
    items: [
      ["Hiring", UserRoundPlus],
      ["Job Changes", UserCog],
      ["Exit", LogOut],
      ["Lifecycle Orchestration", GitBranch],
      ["Lifecycle Tasks", ShieldCheck],
      ["Approvers", CircleUserRound],
      ["Documents", FileText],
      ["Cases", Archive],
      ["Knowledge Base", Columns3],
    ] as const,
  },
];

function Navigation({ mobile = false, close }: { mobile?: boolean; close?: () => void }) {
  return (
    <div className={mobile ? "flex h-full flex-col bg-background" : "flex h-full flex-col bg-sidebar text-sidebar-foreground"}>
      <div className={mobile ? "bg-brand px-4 pb-6 pt-4 text-primary-foreground" : "border-b border-sidebar-border p-4"}>
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
          <img src={adminAvatar} alt="Ahmed Al-Admin" width={64} height={64} className={mobile ? "h-16 w-16 rounded-full object-cover" : "h-9 w-9 rounded-full object-cover"} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Ahmed Al-Admin</p>
            <p className="truncate text-xs opacity-75">HR System Administrator</p>
            {mobile && <Button variant="role" size="sm" className="mt-2">Switch Role <ChevronDown /></Button>}
          </div>
          {mobile && <Button variant="brandGhost" size="icon" aria-label="Close menu" onClick={close}><X /></Button>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {mobile && (
          <label className="relative mb-5 block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground" />
            <Input className="h-10 pl-10 shadow-none" placeholder="Search Menu" />
          </label>
        )}
        {navGroups.map((group) => (
          <div key={group.label || "top"} className="mb-4">
            {group.label && <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{group.label}</p>}
            <div className="space-y-1">
              {group.items.map(([label, Icon]) => {
                const active = label === "Employees";
                return (
                  <div key={label}>
                    <button onClick={active ? undefined : close} className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors ${active ? "bg-brand-soft text-primary" : "hover:bg-accent"}`}>
                      <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}><Icon className="size-4" /></span>
                      <span className="truncate">{label}</span>
                      <ChevronDown className={`size-4 ${active ? "" : "-rotate-90"}`} />
                    </button>
                    {active && (
                      <div className="ml-4 mt-1 space-y-1">
                        {["Employee List", "Change Requests", "Contract Alert Rules", "Contract Types", "Employment Types"].map((item, index) => (
                          <button key={item} onClick={close} className={`grid w-full grid-cols-[10px_minmax(0,1fr)_auto] items-center gap-2 rounded-lg px-3 py-2 text-left text-xs ${index === 0 ? "bg-brand-pale text-primary" : "text-muted-foreground hover:bg-accent"}`}>
                            <span className={`size-1.5 rounded-full ${index === 0 ? "bg-primary" : "bg-muted-foreground"}`} />
                            <span className="truncate">{item}</span>
                            {item === "Change Requests" && <span className="grid size-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">2</span>}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border p-4">
        <Button variant="ghost" className="w-full justify-start text-destructive"><LogOut /> Logout</Button>
      </div>
    </div>
  );
}

function Dashboard() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const filteredEmployees = useMemo(() => employees.filter((employee) => employee[0].toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <main className="min-h-screen bg-surface font-sans text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 lg:block"><Navigation /></aside>
      <div className="lg:pl-56">
        <header className="sticky top-0 z-20 bg-brand text-primary-foreground shadow-sm">
          <div className="grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 lg:h-14 lg:px-6">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild><Button variant="brandGhost" size="icon" className="lg:hidden" aria-label="Open navigation"><Menu /></Button></SheetTrigger>
              <SheetContent side="left" className="w-[min(92vw,375px)] border-0 p-0 [&>button]:hidden">
                <SheetTitle className="sr-only">HR navigation</SheetTitle>
                <Navigation mobile close={() => setMenuOpen(false)} />
              </SheetContent>
            </Sheet>
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold">HR Admin</h1>
              <p className="hidden text-[11px] opacity-75 sm:block">Line Manager</p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="brandGhost" size="icon" aria-label="Notifications"><Bell /></Button>
              <Button variant="brandGhost" size="icon" aria-label="Settings"><Settings /></Button>
              <img src={adminAvatar} alt="Profile" width={32} height={32} className="ml-1 size-8 rounded-full object-cover ring-2 ring-primary-foreground/20" />
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-[1500px] px-4 py-5 lg:px-6">
          <div className="mb-5">
            <p className="text-xs text-muted-foreground">Employees / <span className="font-medium text-foreground">Employee List</span></p>
            <div className="mt-4 flex gap-6 overflow-x-auto border-b border-border text-sm">
              {["Employees", "Org Structure", "Contract Alert Rules", "Contract Types", "Employment Types", "Resources & Tools"].map((tab, index) => (
                <button key={tab} className={`shrink-0 border-b-2 px-1 pb-3 ${index === 0 ? "border-primary font-medium text-primary" : "border-transparent text-muted-foreground"}`}>{tab}</button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[["46", "Active", UsersRound, "success"], ["1568", "Inactive", UserCog, "warning"], ["0", "Leaving", LogOut, "quiet"]].map(([number, label, Icon, tone]) => (
              <div key={label as string} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-xs">
                <span className={`grid size-10 shrink-0 place-items-center rounded-lg bg-${tone}`}><Icon className="size-5" /></span>
                <div><p className="text-2xl font-semibold leading-none">{number as string}</p><p className="mt-1 text-xs text-muted-foreground">{label as string}</p></div>
              </div>
            ))}
          </div>

          <div className="mt-5 overflow-hidden rounded-lg border border-border bg-card shadow-xs">
            <div className="grid gap-3 border-b border-border p-3 sm:grid-cols-[minmax(0,1fr)_auto]">
              <label className="relative min-w-0">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9 shadow-none" placeholder="Search employees..." />
              </label>
              <div className="flex gap-2 overflow-x-auto">
                <Button variant="outline" size="sm"><Columns3 /> Columns</Button>
                <Button size="sm"><UserRoundPlus /> Add Employee</Button>
              </div>
            </div>

            <div className="hidden grid-cols-[minmax(240px,1fr)_130px_120px_260px] border-b border-border bg-muted px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:grid">
              <span>Name & role</span><span>Dept / type</span><span>Joined</span><span className="text-right">Actions</span>
            </div>
            <div className="divide-y divide-border">
              {filteredEmployees.map((employee, index) => (
                <article key={employee[0]} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-3 transition-colors hover:bg-accent md:grid-cols-[auto_minmax(190px,1fr)_130px_120px_260px] md:px-4">
                  <img src={adminAvatar} loading="lazy" alt="" width={40} height={40} className="size-10 rounded-full object-cover" style={{ objectPosition: `${45 + (index % 3) * 5}% center` }} />
                  <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-2"><h2 className="truncate text-sm font-medium">{employee[0]}</h2><span className={`hidden shrink-0 rounded px-1.5 py-0.5 text-[10px] sm:inline ${employee[2] === "Active" ? "bg-success text-success-foreground" : employee[2] === "On Leave" ? "bg-warning text-warning-foreground" : "bg-brand-pale text-primary"}`}>{employee[2]}</span></div>
                    <p className="truncate text-xs text-muted-foreground">{employee[1]}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground md:hidden">{employee[3]} · {employee[4]}</p>
                  </div>
                  <Button variant="ghost" size="icon" aria-label={`Edit ${employee[0]}`} className="md:hidden"><ChevronRight /></Button>
                  <div className="hidden text-xs md:block"><p>{employee[3]}</p><p className="text-muted-foreground">{employee[4]}</p></div>
                  <p className="hidden text-xs text-muted-foreground md:block">{employee[5]}</p>
                  <div className="hidden justify-end gap-2 md:flex">
                    <Button variant="outline" size="sm"><Pencil /> Edit</Button>
                    <Button variant="outline" size="sm"><FileText /> Documents</Button>
                    <Button variant="soft" size="sm"><Download /> Download</Button>
                  </div>
                </article>
              ))}
            </div>
            {filteredEmployees.length === 0 && <p className="p-10 text-center text-sm text-muted-foreground">No employees found.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}