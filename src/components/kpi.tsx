import React, { useEffect, useState } from "react";
import { Tickets } from "@/lib/types";

import { getTickets } from "@/components/api/dashboardApi";
import { removeToken } from "@/components/api/authApi";
import { useNavigate } from "react-router-dom"; 

const KPI = () => {
  const [data, setData] = useState<Tickets[]>([]);
  const navigate = useNavigate();



useEffect(() => {
  const fetchTickets = async () => {
    try {
      const response = await getTickets();
      console.log("API Response:", response);

      if (Array.isArray(response.data.ticketId)) {
        setData(response.data.ticketId);
      } else {
        console.error("Unexpected response format:", response.data);
      }
      console.log("fetchTicketsfetchTickets", response.data);
    } catch (error: any) { // Adding a type for error
      console.log(error);
      if (error.response && error.response.status === 401) {
        removeToken();
        alert("Session expired! Please login again.");
        navigate("/login");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  fetchTickets();
}, [navigate]);

const pendingTicketsCount = data.filter(ticket => ticket.status === "open").length;
const raisedTodayCount = data.filter(ticket => 
  new Date(ticket.raised_at).toDateString() === new Date().toDateString()
).length;

const breachedCount = data.filter(ticket => {
  const slaDue = new Date(ticket.sla_due);
  const slaStart = new Date(ticket.sla_start);
  const difference = slaStart.getTime()-slaDue.getTime() ;
  return difference < 0;
}).length;

const aboutToBreachCount = data.filter(ticket => {
  const slaDue = new Date(ticket.sla_due);
  const slaStart = new Date(ticket.sla_start);
  const difference = (slaDue.getTime() - slaStart.getTime()) / (1000 * 60);
  return difference > 0 && difference <= 30; // 
}).length;

const kpis = [
  { label: "pending tickets", value: pendingTicketsCount },
  { label: "raised today", value: raisedTodayCount },
  { label: "breached", value: breachedCount },
  { label: "about to breach", value: aboutToBreachCount },
  { label: "not assigned", value: data.filter(ticket => ticket.assignedToMe === false).length },
  { label: "technicians available", value: 18 },
];

  return (
    <div className="w-full mt-6 justify-center">
      <div className="flex gap-10 w-full items-center justify-center ">
        {kpis.map((kpi, index) => (
          <div
            className={`px-3 py-4 rounded-md border border-muted ${kpi.label === "technicians available" && "bg-green-600"
              } 
            ${kpi.label === "not assigned" && "bg-slate-500 "}
            ${kpi.label === "pending tickets" && "bg-yellow-500 "}
            ${kpi.label === "raised today" && "bg-blue-500 "}
            ${kpi.label === "breached" && "bg-red-600 "}
             ${kpi.label === "about to breach" && "bg-orange-500 animate-pulse"
              }`}
            key={index}
          >
            <span className="flex align-text-bottom gap-2 align-bottom">
              <p className="text-2xl font-thin">{kpi.value}</p>
              <p className="text-xs pt-2 capitalize">{kpi.label}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KPI;
