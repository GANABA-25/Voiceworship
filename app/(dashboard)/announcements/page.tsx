import Button from "@/components/ui/button";
import Button2 from "@/components/ui/button-2";
import Dialog from "@/components/Dialog";

import AnnouncementCard from "@/components/announcement-card";

export default function page() {
  return (
    <div>
      <header className="flex items-center justify-between border-b border-border bg-card p-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-black">Announcements</h1>
          <p className="text-sm text-muted">Slides for service notices</p>
        </div>

        <Dialog
          trigger={<Button2 label="create Announcement" />}
          title="Create Announcement"
          description="Share important church updates, upcoming events, and special notices with your congregation."
          footer={
            <>
              <Button label="Cancel" />
              <Button label="Add Announcement" />
            </>
          }
        >
          <div className="space-y-3">
            <input
              placeholder="Song title"
              className="w-full rounded-md border border-border bg-background px-3 py-2"
            />
            <input
              placeholder="Artist or singer"
              className="w-full rounded-md border border-border bg-background px-3 py-2"
            />
          </div>
        </Dialog>
      </header>

      <main className="p-4">
        <div className="grid grid-cols-2 gap-4 ">
          <AnnouncementCard />
          <AnnouncementCard />
          <AnnouncementCard />
          <AnnouncementCard />
        </div>
      </main>
    </div>
  );
}
