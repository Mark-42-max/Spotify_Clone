import React, {useState} from "react";
import useAuth from "../useAuth";
import { Container, Input } from "reactstrap";

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);

  const [search, setSearch] = useState("");

  return (
    <Container className="d-flex flex-column py-2" style={{height: "100vh"}}>
      
      <Input type="search" 
      placeholder="Search Songs/Artists" 
      bsSize="lg"
      value={search} 
      onChange={(e) => {setSearch(e.target.value); console.log(search)} }
      />

      <div className="flex-grow"></div>

    </Container>
  )
};

export default Dashboard;
