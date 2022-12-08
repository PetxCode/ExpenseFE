import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { totalSaleReport, userDecode } from "../../../Global/GlobalState";
import { useRecoilState, useRecoilValue } from "recoil";
import numeral from "numeral";

const url = "https://event-3p90.onrender.com";

interface iData {
  _id: string;
  submittedBy: string;
  image: string;
  totalExpense: number;
  totalSales: number;
  hubName: string;
  date: string;
  profit: number;
  map(): () => {};
  // flat(): void
}

const LineChart: React.FC = () => {
  const user = useRecoilValue(userDecode);
  const [newSales, setNewSales] = useRecoilState(totalSaleReport);
  // const [newSales, setNewSales] = useState([] as {}[]);
  // const [newMySales, setNewMySales] = useRecoilState(totalSaleReport);

  const sortedSales = (props: any) => {
    return (a: any, b: any) => {
      if (a[props] > b[props]) {
        return -1;
      } else {
        return 0;
      }
    };
  };

  const groupBy = (props: any, items: any) => {
    return props.reduce((data: any, item: any) => {
      (data[item[items]] = data[item[items]] || []).push(item);
      return data;
    }, {});
  };

  const [salesDated, setSalesDated] = useState([] as any[]);
  const [data, setData] = useState<any[]>([]);
  const [sales, setSales] = useState([] as iData[]);

  const [monday, setMonday] = useState<number>(0);
  const [tuesday, setTuesday] = useState<number>(0);
  const [wednesday, setWednesday] = useState<number>(0);
  const [thursday, setThursday] = useState<number>(0);
  const [friday, setFriday] = useState<number>(0);
  const [saturday, setSaturday] = useState<number>(0);
  const [sunday, setSunday] = useState<number>(0);

  const [recordData, setRecordData] = useState([] as any[]);

  const getAll = async () => {
    const newURL = `${url}/api/sales/${user._id}/record`;
    await axios.patch(newURL).then((res) => {
      setSales(res.data.data.salesRecord.sort(sortedSales("profit")));
    });
  };
  const getDays = () => {
    setData(Object.keys(groupBy(sales, "dated")));
  };

  const getAllDated = async () => {
    let data: number[] | 0 = Object.values(groupBy(sales, "dated"));
    setSalesDated(
      data
        .map((el: any) => el.profit)
        .reduce((a: number, b: number) => {
          return a + b;
        })
    );
  };

  const mondayValue = () => {
    if (sales.length > 0) {
      setMonday(
        groupBy(sales, "dated")
          .Monday // .flat()
          .map((props: any) => {
            return props.profit;
          })
          .reduce((a: number, b: number) => {
            return a + b;
          })
      );
    }
  };

  const tuesdayValue = () => {
    if (sales.length > 0) {
      setTuesday(
        groupBy(sales, "dated")
          .Tuesday // .flat()
          .map((props: any) => {
            return props.profit;
          })
          .reduce((a: number, b: number) => {
            return a + b;
          })
      );
    }
  };

  const wednesdayValue = () => {
    if (sales.length > 0) {
      setWednesday(
        groupBy(sales, "dated")
          .Wednesday // .flat()
          .map((props: any) => {
            return props.profit;
          })
          .reduce((a: number, b: number) => {
            return a + b;
          })
      );
    }
  };

  const thursdayValue = () => {
    if (sales.length > 0) {
      setThursday(
        groupBy(sales, "dated")
          .Thursday // .flat()
          .map((props: any) => {
            return props.profit;
          })
          .reduce((a: number, b: number) => {
            return a + b;
          })
      );
    }
  };

  const fridayValue = () => {
    if (sales.length > 0) {
      setFriday(
        groupBy(sales, "dated")
          .Friday // .flat()
          .map((props: any) => {
            return props.profit;
          })
          .reduce((a: number, b: number) => {
            return a + b;
          })
      );
    }
  };

  const saturdayValue = () => {
    if (sales.length > 0) {
      setSaturday(
        groupBy(sales, "dated")
          .Saturday // .flat()
          .map((props: any) => {
            return props.profit;
          })
          .reduce((a: number, b: number) => {
            return a + b;
          })
      );
    }
  };
  const sundayValue = () => {
    if (sales.length > 0) {
      setSunday(
        groupBy(sales, "dated")
          .Sunday // .flat()
          .map((props: any) => {
            return props.profit;
          })
          .reduce((a: number, b: number) => {
            return a + b;
          })
      );
    }
  };

  const createdArray = () => {
    if (groupBy(sales, "dated").Monday) {
      mondayValue();
    } else {
      return;
    }

    if (groupBy(sales, "dated").Tuesday) {
      tuesdayValue();
    } else {
      return;
    }

    if (groupBy(sales, "dated").Wednesday) {
      wednesdayValue();
    } else {
      return;
    }

    if (groupBy(sales, "dated").Thursday) {
      thursdayValue();
    } else {
      return;
    }

    if (groupBy(sales, "dated").Friday) {
      fridayValue();
    } else {
      return;
    }

    if (groupBy(sales, "dated").Saturday) {
      saturdayValue();
    } else {
      return;
    }

    if (groupBy(sales, "dated").Sunday) {
      sundayValue();
    } else {
      return;
    }
  };

  useEffect(() => {
    // const newURL = `${url}/api/sales/${user._id}/record`;
    // axios.patch(newURL).then((res) => {
    //   setSales(res.data.data.salesRecord.sort(sortedSales("profit")));
    // });

    getAllDated();
    getAll();
    getDays();
    createdArray();

    // mondayValue();
    // tuesdayValue();
    // wednesdayValue();
    // thursdayValue();
    // fridayValue();
    // saturdayValue();
    // saturdayValue();
    // sundayValue();

    if (monday !== 0) {
      mondayValue();
    }

    if (tuesday !== 0) {
      tuesdayValue();
    }

    if (wednesday !== 0) {
      wednesdayValue();
    }

    if (thursday !== 0) {
      thursdayValue();
    }

    if (friday !== 0) {
      fridayValue();
    }

    if (saturday !== 0) {
      saturdayValue();
    }

    if (sunday !== 0) {
      sundayValue();
    }

    setNewSales([
      setRecordData([
        { day: "Monday", cost: monday },
        { day: "Tuesday", cost: tuesday },
        { day: "Wednesday", cost: wednesday },
        { day: "Thursday", cost: thursday },
        { day: "Friday", cost: friday },
        { day: "Saturday", cost: saturday },
        { day: "Sunday", cost: sunday },
      ]),
    ]);
  }, []);

  console.log(monday, tuesday, wednesday, thursday);
  // console.log("state: ", newSales);
  // console.log("record: ", recordData);
  // console.log("sales: ", sales);
  // console.log(dated);

  return (
    <Holder>
      {newSales.map((props: any, i: number) => (
        <div key={i}>
          <Container>
            <div style={{ fontSize: "10px" }}>
              ₦{Math.floor(props.cost * 0.001)}
              <strong>K</strong>
            </div>
            <Chart he={`${Math.floor(props.cost * 0.001) * 0.8}%`} />
            <div style={{ fontSize: "10px" }}>{props.day}</div>
            {/* <div style={{ fontSize: "10px" }}>
              {Math.floor(props.cost * 0.001)}₦<strong>K</strong>
            </div> */}
          </Container>
        </div>
      ))}
    </Holder>
  );
};

export default LineChart;

const DivData = styled.div`
  width: 100%;
  height: 100%;
`;

const Div = styled.div`
  margin: 0 20px;
`;

const Hold = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 80px;
  height: 100%;
`;

const Chart = styled.div<{ he: string }>`
  margin: 0 20px;
  background-color: #012e8f;
  height: ${({ he }) => he};
  width: 20px;
  border-radius: 5px 5px 0 0px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 230px;
`;

const Container = styled.div`
  /* width: 80px; */
  height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin: 0 7px;
`;

const Holder = styled.div`
  display: flex;
  width: 520px;
  height: 230px;
  background-color: rgba(0, 0, 0, 0.05);
`;
