import React, { useEffect, useState, useContext  } from 'react';
import {
  Row,
  Col,
 
  Button,
  TabPane,
  TabContent,
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
// import {  ErrorOutlineSharp } from '@material-ui/icons';
// import he from 'he';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import ComponentCard from '../../components/ComponentCard';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import api from '../../constants/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEmployee from '../../components/LabourRequest/AddEmployee';
import PlanningMainDetails from '../../components/LabourRequest/PriceMainDetails';
import PlanningButton from '../../components/LabourRequest/PriceButton';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import AppContext from '../../context/AppContext';
import ComponentCardV2 from '../../components/ComponentCardV2';
import PdfLabourRequest from '../../components/PDF/PdfLabourRequest';



const PriceListEdit = () => {
  //Const Variables
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [plannings, setPlannings] = useState({});
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  // const [selectedLanguage, setSelectedLanguage] = useState(''); // State to hold the selected language
  // const [convertedText, setConvertedText] = useState('');
  // const [error, setError] = useState('');


const [arabic, setArabic] = useState([]);

  // Fetch translation when selectedLanguage or  plannings changes
//   const fetchTranslation = async () => {
//     api.get('/translation/getTranslation')
//     .then((res) => {
//       res.data.data.forEach(async (cell) => {
//     if (!selectedLanguage) return; // Don't make API call if language not selected
//     try {
//       const response = await axios.post(
//         'https://translation.googleapis.com/language/translate/v2',
//         {},
//         {
//           params: {
//             q: cell.value,
//             target: "ar",
//             key: 'AIzaSyA_eJTEvBDRBHo8SYmq_2PyCh8s_Pl6It4' // Replace with your Google Translate API key
//           }
//         }
//       );
//       console.log('trabsss',response.data.data.translations[0].translatedText)
//       setConvertedText(response.data.data.translations[0].translatedText);
//       setError('');
//     } catch (errors) {
//       setError('Translation failed. Please try again later.');
//       console.error('Translation error:', ErrorOutlineSharp);
//     }
//   })
// })
//   };

//   useEffect(() => {
//   fetchTranslation();
// }, [selectedLanguage, plannings]);

// const handleLanguageChange = (language) => {
//   setSelectedLanguage(language);
// };
const { id } = useParams();
const navigate = useNavigate();

  // Fetch translation when selectedLanguage or plannings changes
  const fetchTranslation = async () => {
    try {
      const res1 = await api.get('/labourrequest/getTranslationColumn');
      res1.data.data.forEach(async (item) => {
        const columnNames = item.COLUMN_NAME_TRUNCATED;
        
        console.log('columnNames',columnNames)
        const res = await api.post('/labourrequest/getLabourTranslation', { labour_request_id: id, columnNames });
       
          console.log('resss',res.data.data)
        res.data.data.forEach(async (cell) => {
          Object.keys(cell).forEach(async(property) => {
            console.log('colm', cell[property]);
        
  
          try {
            const response = await axios.post(
              'https://translation.googleapis.com/language/translate/v2',
              {},
              {
                params: {
                  q:cell[property],
                  target: 'ar',
                  key: 'AIzaSyA_eJTEvBDRBHo8SYmq_2PyCh8s_Pl6It4', // Replace with your Google Translate API key
                },
              }
            );
             console.log(property,'_arb')
             console.log('trabsss', response.data.data.translations[0].translatedText);
            await api.post('/labourrequest/editLabourRequestArb', {
              
              labour_request_id:id,
              [`${property}_arb`]: response.data.data.translations[0].translatedText,
              value: response.data.data.translations[0].translatedText,
          columnName:`${property}_arb`
            });
            
            // const translation = JSON.parse(response.data.data.translations[0].translatedText)
            // console.log('tran',translation);
            
            // const decodedJson = he.decode(response.data.data.translations[0].translatedText);
            // const fixedJsonString =  decodedJson.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
            // const fixedString = fixedJsonString.replace(/:(\s*)(\d{4}-\d{2}-\d{2})/g, ':"$2');
            // const commastring= fixedString.replace(/،/g, ',');
            // console.log('decoded json',decodedJson);
            // console.log('fixedJsonString ',commastring);
            // const newtext=JSON.parse(commastring);
            // console.log('newtext',newtext.request_urgency);
          } catch (error) {
            console.error('Error occurred during translation:', error);
          }
        });
      });
      });
    
    } catch (error) {
      console.error('Error fetching translation column names:', error);
    }
  };
   
  const arb =selectedLanguage === 'Arabic'
  const eng =selectedLanguage === 'English'

  const getArabicCompanyName = () => {
      api
      .get('/labourrequest/getTranslationForLabourRequest')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };
  
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }


  

  // Navigation and Parameter Constants


  // Button Save Apply Back List
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/LabourRequest');
  };

    // Start for tab refresh navigation #Renuka 1-06-23
    const tabs =  [
      {id:'1',name:'Attachment'},
    ];
    const tabsArb = [
      { id: '1', name: 'مرفق' },
    ];
    const toggle = (tab) => {
      setActiveTab(tab);
    };
   
  // Get Leaves By Id
  const PlanningById = () => {
    api
      .post('/labourrequest/getLabourRequestById', { labour_request_id: id })
      .then((res) => {
        setPlannings(res.data.data[0]);
      })
      .catch(() => {
        
      });
  };
  //Leave Functions/Methods
  const handleInputs = (e) => {
    setPlannings({ ...plannings, [e.target.name]: e.target.value });
  
  };
  // Attachment
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  const { loggedInuser } = useContext(AppContext);

  //Logic for edit data in db
  const editplanningData = () => {
    plannings.modification_date = creationdatetime;
    plannings.modified_by = loggedInuser.first_name;
    
    if (
      plannings.request_date      ) {
      api
        .post('/labourrequest/editLabourRequest', plannings)
        .then(() => {
          message('Record editted successfully', 'success');
          setTimeout(() => {
            window.location.reload();
          }, 300);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
 
  
//   try {
//     // Decode HTML entities
//     const decodedText = he.decode(convertedText);
    
//     // Parse the decoded JSON string
//     const translation = JSON.parse(decodedText);
//     console.log('translation:', translation);
//     console.log('Request Urgency:', translation.request_urgency);
// } catch (error1) {
//     console.error('Error parsing JSON:', error1);
//     console.log('Input JSON:', convertedText); 
// }
  useEffect(() => {
    PlanningById();
    getArabicCompanyName();
    // fetchTranslation();
  }, [id]);

  return (
    <>
     {/*  */}
      {/* BreadCrumbs */}
      <BreadCrumbs />
      {/* Button */}
      <PlanningButton
       editData={editplanningData}
       fetchTranslation={fetchTranslation}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
        arb={arb}
       ></PlanningButton>
       <ComponentCardV2>
        <PdfLabourRequest></PdfLabourRequest>
       </ComponentCardV2>
       {/* Main Details */}
      <PlanningMainDetails
        handleInputs={handleInputs}
        plannings={plannings}
        arb={arb}
        eng={eng}
        arabic={arabic}
        genLabel={genLabel}
        ></PlanningMainDetails>

      {/* Nav tab */}
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
        {eng === true &&
        <Tab toggle={toggle} tabs={tabs} />
        }
        { arb === true &&
        <Tabs toggle={toggle} tabsArb={tabsArb} />
        }
   

        <TabContent className="p-4" activeTab={activeTab}>
        
          {/* Start Tab Content 10 */}
          <TabPane tabId="1" eventkey="addEmployee">
            <Row>
              <AddEmployee  arb={arb}/>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    setRoomName('LabourRequest');
                    setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                    dataForAttachment();
                    setAttachmentModal(true);
                  }}
                >
                  Add
                </Button>
              </Col>
            </Row>

            <AttachmentModalV2
              moduleId={id}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
              roomName={RoomName}
              fileTypes={fileTypes}
              altTagData="LabourRequest Data"
              desc="LabourRequest Data"
              recordType="Picture"
              mediaType={attachmentData.modelType}
            />
            <ViewFileComponentV2 moduleId={id} roomName="LabourRequest" recordType="Picture" />
          </TabPane>
         
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default PriceListEdit;
