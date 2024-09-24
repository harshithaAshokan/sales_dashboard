import { string } from "yup"
import { dropdownCompetitor } from "../axios/services"

export type LeadDataProps= {
    key: string,
    leadId:string,
    leadName:string,
    address:string,
    mobile:string,
    isActive:number,
    leadStatusName:string,
    assignedTo:string,
  }
  
  export type leaddAddProps =
  {name: string,
  remarks: string,
  phone_country_code: string,
  landline_number: string,
  whatsapp_country_code: string
  alter_country_code: string
  company_name: string
  contact_person: string
  address: string
  area: string
  phone: string
  email: string
  alternative_no: string
  whatsapp_no: string
  customer_category_id: string,
  enquiry_type_id: string
  requirements_id: string
  state: string
  country: string
  city: string
  dealer_id: string
  assignedTo: string
  receivedDate: string
  referedBy: string
  referedPhone: string
  refer_country_code: string
  notes: string
  description: string
  isNew: string
  latitude: string
  longitude: string
  customerId: string
  Pincode: string
  schedule_date: string
  upload_file: string
  approximate_amount: string}


  export type updateStatusProps = {
      leadStatus: number
      comments: string
      competitor: {
        competitorName :string
        competitorId : number
        label:string
        value:string
      }
      dropReason: string
      follow_up_date: string
      poc_date: string
      demo_date: string
      enquiry_type: string
  }


  export type reassignProps = {
     employeeId: string
          dealerId:string
  }

  export type arrayProps = {
    userId :string
    userName:string
  }

  export type competitor = {
    competitorName :string
    competitorId : number
  }

  export type enquiry = {
    enquiryName : string
    enquiryId : string
  }

  export type leadStatusList = {
    leadStatusId: number
    leadStatusName:string
  }

  export type requirementsList = {
    requirementsId : string
    requirementsName : string
  }