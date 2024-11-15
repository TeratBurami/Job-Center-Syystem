import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AcceptConfirm from "../components/AcceptConfirm";
import ApplyJob from "../components/ApplyJob";
import Nav from "../components/Nav";

export default function Detail() {
  const [jobID, setJobID] = useState("");
  const [empID, setEmpID] = useState("");
  const [data, setData] = useState([
    {
      job_id: "",
      title: "",
      detail: "",
      salary: "",
      skill: "",
      ap_gmail: "",
      ap_tel: "",
      ap_id: "",
      emp_gmail: "",
      emp_tel: "",
      emp_id: "",
      work_exp: "",
      ability: "",
      education: "",
      company: "",
      req_edu: "",
      req_age: "",
    },
  ]);
  const role = localStorage.getItem("user_role");
  const applicant_id = localStorage.getItem("user_id");

  const { jobId } = useParams();
  // const job_url=`http://localhost:3333/api/job/${jobId}`
  const job_url=`https://job-center-system-api.vercel.app/api/job/${jobId}`
  // const detail_url=`http://localhost:3333/api/detail/${jobId}`
  const detail_url=`https://job-center-system-api.vercel.app/api/detail/${jobId}`


  useEffect(() => {
    fetch(job_url)
      .then((res) => res.json())
      .then((data) => {
        if (
          data.result[0].emp_id == localStorage.getItem("user_id") ||
          role != "employer"
        ) {
          fetch(detail_url)
            .then((res) => res.json())
            .then((data) => {
              setData(data.result);
              setJobID(data.result[0].job_id);
              setEmpID(data.result[0].emp_id);
            });
        } else {
          alert("You are not the employer of this job");
          window.location.href = "/";
        }
      });

  }, [jobID, empID]);

  return (
    <div>
      <Nav></Nav>
      <div className="mt-10 px-20">
        <h1 className="text-2xl font-bold mb-4">Job Detail</h1>
        <div className="rounded shadow shadow-slate-900 p-4">
          <div className="flex justify-between mt-1">
            <div className="">
              <h1 className="text-2xl font-bold">
                Title: <span className="font-normal">{data[0].title}</span>
              </h1>
              <h1 className="text-xl font-bold">
                Company: <span className="font-normal">{data[0].company}</span>
              </h1>
            </div>
            <div className="w-40">
              {jobID && empID && role == "applicant" && (
                <ApplyJob
                  job_id={jobID}
                  ap_id={applicant_id?.toString() || "id"}
                  emp_id={empID}
                ></ApplyJob>
              )}
            </div>
          </div>
          <div className="rounded shadow shadow-slate-900 p-4 mt-10">
            <h1 className="text-md font-bold">
              Salary: <span className="font-normal">{data[0].salary}</span>
            </h1>
            <h1 className="text-md font-bold">
              Require Education:{" "}
              <span className="font-normal">{data[0].req_edu}</span>
            </h1>
            <h1 className="text-md font-bold">
              Require Age: <span className="font-normal">{data[0].req_age}</span>
            </h1>
            <h1 className="text-md font-bold">
              Detail: <p className="font-normal">{data[0].detail}</p>
            </h1>
            <h1 className="text-md font-bold">
              Skill: <p className="font-normal">{data[0].skill}</p>
            </h1>
            <h1 className="text-2xl font-bold mt-10">Contact:</h1>
            <h1 className="text-md font-bold">
              Email: <span className="font-normal">{data[0].emp_gmail}</span>
            </h1>
            <h1 className="text-md font-bold">
              Tel: <span className="font-normal">{data[0].emp_tel}</span>
            </h1>
          </div>
          <div hidden={role == "applicant"}>
            <h1 className="text-2xl font-bold mt-20">
              Applied {data[0].ap_gmail == null ? "0" : data.length} applicants
            </h1>
            <TableContainer component={Paper} sx={{ marginTop: "0.5rem" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Gmail</TableCell>
                    <TableCell align="center">Tel</TableCell>
                    <TableCell align="center">Work Experience</TableCell>
                    <TableCell align="center">Skill</TableCell>
                    <TableCell align="center">Education</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item: any) => (
                    <TableRow
                      key={item.job_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.ap_gmail}
                      </TableCell>
                      <TableCell align="center">{item.ap_tel}</TableCell>
                      <TableCell align="center">{item.work_exp}</TableCell>
                      <TableCell align="center">{item.ability}</TableCell>
                      <TableCell align="center">{item.education}</TableCell>
                      <TableCell align="center">
                        {item.ap_gmail && <AcceptConfirm job_id={item.job_id} ap_id={item.ap_id}></AcceptConfirm>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
