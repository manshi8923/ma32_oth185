import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Loading from '../../components/Loading';
import Navbar_oth from '../../components/Navbar_oth';
import MainScreen from '../../components/MainScreen';
import moment from 'moment';
import { FaBraveReverse } from "react-icons/fa6";
import { FaGripfire } from "react-icons/fa";

const Revenue_oth = () => {
  
  const months = ["", "January", "Februrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [month, setMonth] = useState("");
  const [rev_day, setRev_day] = useState(0);
  const [month_rev,setMonth_rev]=useState(0);
  const [year_rev,setYear_rev]=useState(0);
  const [arr,setArr]=useState(0);
  useEffect(() => {
    setLoading(true);
    fetch("/api/oth/guests/", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
        let revenue_day = parseInt(0);
        const date = moment().format("YYYY-MM-DD");date.toString();
        for(let i=0;i<data.length;i++){
          if (data[i].depart == date&&data[i].total!==undefined&&data[i].total!==null) {
            setArr(arr+parseInt(data[i].total));
          }
        }
        if(date[5]=='0'){
          setMonth(months[parseInt(date[6])]);
        }
        else{
          const m=date[5]+date[6];
          setMonth(months[parseInt(5)]);
        }
        let mont_arr=0; let year_arr=0;
        for (let i = 0; i < data.length; i++) {
          if(data[i].depart[5]==date[5]&&data[i].depart[6]==date[6]&&data[i].total!==undefined&&data[i].total!==null){
           mont_arr+=parseInt(data[i].total);
          }
          if(data[i].total!==undefined&&data[i].total!==null){
             year_arr+=parseInt(data[i].total);
          }
      }
      if(date[5]==='0'){
        year_arr=year_arr/(parseInt(date[6]));
      }
      else{
        const year=date[5]+date[6];
        year_arr=year_arr/(parseInt(year));
      }
      setYear_rev(year_arr);
      setMonth_rev(mont_arr);
        for (let i = 0; i < data.length; i++) {
          if (data[i].depart == date&&data[i].total!==undefined&&data[i].total!==null) {
            revenue_day += parseInt(data[i].total);
          }
        }
        setRev_day(revenue_day);
      })
  }, []);

  return (
    <>
      <Navbar_oth />
      <MainScreen title="Average Room Revenue is here">
        {loading && <Loading />}
        <div className='revenue'>
          <Card style={{ width: '18rem', margin: '2rem', paddingTop: '15px' }}>
            <FaBraveReverse size={'10rem'} style={{ margin: 'auto', color: 'gray' }} />
            <Card.Body>
              <Card.Text>
                <h3 style={{ color: 'red' }}>Revenue of {new Date().toLocaleDateString()} : {rev_day}</h3>
                <h4 style={{ color: 'blue' }}>ARR of {new Date().toLocaleDateString()} : {arr} </h4>
                <h4 style={{ color: 'orange' }}>Monthly Prediction : {rev_day * 30} </h4>
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/ma/guests')} >Go to Dashboard</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem', margin: '2rem', paddingTop: '15px' }}>
            <FaGripfire size={'8rem'} style={{ margin: 'auto', color: 'gray' }} />
            <Card.Body>
              <Card.Text>
                <h3 style={{ color: 'red' }}>Monthly Revenue ({month}) : {month_rev/30} </h3>
                <h4 style={{ color: 'blue' }}>ARR of {month} : {month_rev} </h4>
                <h4 style={{ color: 'orange' }}>Yearly Prediction : {year_rev* 12}</h4>
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/ma/guests')} >Go to Dashboard</Button>
            </Card.Body>
          </Card>
        </div>
      </MainScreen>
    </>
  )
}





export default Revenue_oth