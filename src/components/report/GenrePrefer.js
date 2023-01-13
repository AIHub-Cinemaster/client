import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import { getPrefer } from "lib/api/report";


const GenrePrefer = ()=>{
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [myGenres, setMyGenres] = useState([]);
  const [myCnt, setMyCnt] = useState([]);
  const [myAver, setMyAver] = useState([]);
  const [myArr, setMyArr] = useState([]);

  let arr1 = []
  let arr2 = []
  let arr3 = []

  useEffect(() => {
    getPrefer(cookies.userData.shortId).then(response => {
      setMyArr(response.data.result)

      response.data.result.forEach((item) => {
        arr1.push(item.name);
        arr2.push(item.cnt);
        arr3.push(item.aver);
      })

      setMyGenres(arr1)
      setMyCnt(arr2)
      setMyAver(arr3)      
    })
  }, [])

  const data = {
    labels: myGenres,
    datasets: [ 
      {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: 'rgb(255, 99, 132)',
        data: myAver,
        borderColor: 'red',
        borderWidth: 2,        
        // borderRadius:15
        
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    plugins: {
        legend: {
            display: false,
        },
    },
  }

  return (
    <>
      <Bar type="bar" data={data} options={options} />
      <div className="m-5">
        {
          myArr.map((item)=>{
            return(
              <div className="flex-box m-3">
                <p className="white-middle-font mb-1">{item.name}</p>
                <p className="grey-middle-font mb-1">{item.cnt}개</p>
              </div>
            )
          })
        }
      </div>
    </>
  )

}

export default GenrePrefer;