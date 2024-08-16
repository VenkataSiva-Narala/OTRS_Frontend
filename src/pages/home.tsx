
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom";
import KPI from "@/components/kpi";
import App from "@/tanStack/tableTanStack";
import { useState } from "react";
import { createTicket } from "@/components/api/createTicketApi";
import { TicketFilters } from "@/components/api/filterApi";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const Home = () => {
  const navigate = useNavigate();
  const [newTicketDialogOpen, setNewTicketDialogOpen] = useState(false);
  const [FiltersData, setFiltersData] = useState({
    start_date: "",
    end_date: "",
    ticket_id: 0,
    type: "",
    title: "",
    bucket: "",
    status: "",
    severity: "",
    // priority:"",
    // customer_id:2,
    // description:"",
    // "raised_at":,
    // data:"",
    // "raised_by_id":,
    // "resolved_by_id":,
    // sort_order:""
    // "sort_by": ""
  });
  const [ticketData, setTicketData] = useState({

    ticketType: "",
    severity: "",
    ticketData: {
      title: "",
      description: "",
    },
    remarks: "",
    // attachments: []
  });

  const handleFilterChange = (field, value) => {
    setFiltersData(prev => ({
      ...prev,
      [field]: value.trim(),
    }));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    if (id === "title" || id === "description") {
      setTicketData(prevState => ({
        ...prevState,
        ticketData: {
          ...prevState.ticketData,
          [id]: value
        }
      }));
    } else {
      setTicketData(prevState => ({
        ...prevState,
        [id]: value,
      }));
    }
  };
  const handleSelectChange = (id: string, value: string) => {
    setTicketData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };


  const handleCreateTicket = async () => {
    console.log("Sending ticket data:", ticketData);

    try {
      const response = await createTicket(ticketData);
      console.log("Ticket created successfully", response.data);

      alert("Ticket created successfully:");
      setNewTicketDialogOpen(false);
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  const handleFilterTicket = async () => {
    console.log("Sending FiltersData:", FiltersData);

    try {
      const response = await TicketFilters(FiltersData);
      console.log("FiltersData created successfully", response.data);

      alert("Filter applied successfully!");
      setNewTicketDialogOpen(false);
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div>
      <KPI />
      <div className="flex justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="mr-5 p-5 h-6 w-6 bg-blue-700 rounded-full"
                variant="outline"
                onClick={() => setNewTicketDialogOpen(true)}
              >
                +
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click here to create a New ticket</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {newTicketDialogOpen && (
          <Dialog open={newTicketDialogOpen} onOpenChange={setNewTicketDialogOpen}>
            <DialogContent >
              <DialogHeader>
                <DialogTitle>Add New Ticket</DialogTitle>
                <DialogDescription>Fill in the details to create a new ticket</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tickettype" className="text-left">
                    Ticket Type
                  </Label>

                  <Select
                    onValueChange={(value) => handleSelectChange("ticketType", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SR">Service Request</SelectItem>
                      <SelectItem value="issue">Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="severity" className="text-left">
                    Severity
                  </Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("severity", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="S1">S1</SelectItem>
                      <SelectItem value="S2">S2</SelectItem>
                      <SelectItem value="S3">S3</SelectItem>

                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-left">
                    Title
                  </Label>
                  <Input id="title" type="text"
                    value={ticketData.ticketData.title}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-left">
                    Description
                  </Label>
                  <Input
                    id="description"
                    type="text"
                    value={ticketData.ticketData.description}
                    className="col-span-3"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="remarks" className="text-left">
                    Remarks
                  </Label>
                  <Input id="remarks" type="text"
                    value={ticketData.remarks}
                    className="col-span-3"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="Accesstype" className="text-left">
                    Assign Type
                  </Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="group">Group</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="Accesstype" className="text-left">
                    Assign To
                  </Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user-list">User-list</SelectItem>
                      <SelectItem value="group-list">Group-list</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <SheetClose asChild>
                  <Button type="submit" onClick={handleCreateTicket} >
                    Create Ticket
                  </Button>
                </SheetClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        <Sheet>
          <SheetTrigger asChild>
            <Button className=" mt-5 mr-5 p-5 bg-violet-700" variant="outline">
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Apply Filters</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ticketId" className="text-left">
                  Ticket Id
                </Label>
                <Input
                  id="ticketId"
                  type="number"
                  value={FiltersData.ticket_id}
                  onChange={(e) => handleFilterChange("ticket_id", e.target.value)}

                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tickettype" className="text-left">
                  Ticket Type
                </Label>

                <Select
                  value={FiltersData.type}
                  onValueChange={(value) => handleFilterChange("type", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SR">Service Request</SelectItem>
                    <SelectItem value="issue">Issue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ticketBucket" className="text-left">
                  Ticket Bucket
                </Label>
                <Input
                  id="ticketBucket"
                  type="text"
                  value={FiltersData.bucket}
                  onChange={(e) => handleFilterChange("bucket", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="createdOn" className="text-left">
                  Created On
                </Label>
                <Input
                  id="createdOn"
                  type="date"
                  value={FiltersData.start_date}
                  onChange={(e) => handleFilterChange("start_date", e.target.value)}
                  className="col-span-3"
                />
              </div>
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="createdBy" className="text-left">
                  Created By
                </Label>
                <Input
                  id="createdBy"
                  type="text"
                  value=""
                  className="col-span-3"
                />
              </div> */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="severity" className="text-left">
                  Severity
                </Label>
                <Select
                  value={FiltersData.severity}
                  onValueChange={(value) => handleFilterChange("severity", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S1">S1</SelectItem>
                    <SelectItem value="S2">S2</SelectItem>
                    <SelectItem value="S3">S3</SelectItem>

                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Title" className="text-left">
                  Title
                </Label>
                <Input
                  id="Title"
                  type="text"
                  value={FiltersData.title}
                  onChange={(e) => handleFilterChange("title", e.target.value)}
                  className="col-span-3"
                />
              </div>
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="technician" className="text-left">
                  Technician
                </Label>
                <Input
                  id="technician"
                  type="text"
                  value=""
                  className="col-span-3"
                />
              </div> */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-left">
                  Due Date
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={FiltersData.end_date}
                  onChange={(e) => handleFilterChange("end_date", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="breachStatus" className="text-left">
                  Status
                </Label>
                <Input
                  id="breachStatus"
                  type="text"
                  value={FiltersData.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="col-span-3"
                />
              </div>
              {/* <div className="grid grid-cols-4 items-center gap-4 ">
                <Label htmlFor="assigned/Pickup" className="text-left">
                  Assigned/Pickup
                </Label>
                <Input
                  id="assignedPickup"
                  type="text"
                  value=""
                  className="col-span-3"
                />
              </div> */}
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={handleFilterTicket}>Apply</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-2">


        <App />
      </div>
    </div>
  );
};

export default Home;
