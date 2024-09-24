
import { useEffect, useState } from 'react'
import { useToken } from '../../../utility/hooks';
import { dashboard} from '../../../axios/services';
import { Card, Col, message, Row, Typography } from 'antd';
const {Title} = Typography

export default function HomeNew() {
    const token = useToken();
    const [dashboardValues,setDashboardValues] = useState<DashboradDataProps[]>([])
    const handleDashboard = () => {
        const formData = new FormData();
        formData.append("token",token)
        dashboard(formData).then((response) => {
            console.log(response.data.data)
            if(response.data.status)
            {
              setDashboardValues(response.data.data)  
            }
            else {
                message.error("It is not valid")
            }
            
        }).catch((Err) => {
            console.log(Err)
        })
    }
    useEffect(() => {
        if(token){
           handleDashboard(); 
        }
     
    },[token])
    console.log(dashboardValues,"dashboardValues")
  return (
    <div>
        
      {
        dashboardValues?.length > 0 ? dashboardValues?.map((item) => {
            return(
            <Card>
             <Title>{item.displayName}</Title>
             <Row>
                <Col span={24}>{item.leads.displayName}</Col>
                <Col span={24}>{item.leads.value}</Col>
             </Row>
             <Row>
                <Col span={24}>{item.over_due.displayName}</Col>
                <Col span={24}>{item.over_due.value}</Col>
             </Row>
            </Card>
          )
        })
         : null
      }
    </div>
  )
}
