import React, {useEffect, useState} from "react";
import exp from "node:constants";
import {IOrg, IQuestion} from "../../models";
import useModal from "../../hooks/useModal";
import OrgService from "../../services/OrgService";
import QuestionService from "../../services/QuestionService";
import Modal from "../Modal";
import {EditOrg} from "../Organization/EditOrg";
import {CreateNewOrg} from "../Organization/CreateNewOrg";
import {DeleteOrg} from "../Organization/DeleteOrg";
import {EditQuestion} from "./EditQuestion";
import {DeleteQuestion} from "./DeleteQuestion";
import {CreateNewQuestion} from "./CreateQuestion";



export function QuestionComponent(){
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [details, setDetails] = useState(false);
    const btnBgClassName = details? 'bg-grey': 'bg-white';
    const btnClasses = ['py-2 px-4 border-2', btnBgClassName]
    const {isOpen, toggle} = useModal();
    const [selectedId, setSelectedId] = useState<number>(0);
    const [mode, setMode] = useState<"edit" | "create" | "delete">("edit")
    const [refresh, setRefresh] = useState(true);


    useEffect(()=>{
        if (refresh) {
            QuestionService.getQuestions().then((response)=>{
                setQuestions(response.data);
                setRefresh(false)
            });
        }
    }, [refresh]);

    function refreshPage(){
        setRefresh(true)
        toggle()
    }
    
    
    function addQuestion(question: IQuestion){
        setQuestions(prev =>[...prev, question]);
    }
    
    function editQuestion(question: IQuestion){
        const index = questions.findIndex((q)=>q.questionId === question.questionId);
        if (index !== -1){
            const updateOrgs = [...questions];
            updateOrgs[index] = question;
            setQuestions(updateOrgs);
        }
    }

    function deleteQuestion(question:IQuestion){
        const index = questions.findIndex((q) => q.questionId === question.questionId);
        if (index !== -1){
            const updatedQuestions = questions.filter((q) => q.questionId !== question.questionId);
            setQuestions(updatedQuestions)
        }
    }
    
    
    const createHandler = (question: IQuestion) =>{
        addQuestion(question);
        refreshPage()
    }

    const editHandler = (question: IQuestion) =>{
        editQuestion(question);
        refreshPage();

    }

    const deleteHandler = (question: IQuestion) =>{
        deleteQuestion(question);
        refreshPage();
    }


    function handleEditClick(questionId:number){
        setSelectedId(questionId);
        setMode("edit");
        toggle();
    }


    function handleCreateClick(){
        setMode("create");
        toggle();
    }

    function handleDeleteClick(questionId: number){
        setSelectedId(questionId);
        setMode("delete");
        toggle();
    }

    return(
        <div>
            {/*<h3 className="text-lg-start">Questionanizations</h3>*/}
            <table className="table table-bordered">
                <thead>
                <tr>
                    <td>Question Id</td>
                    <td>Question Name</td>
                    <td>Question Annotation</td>
                    <td>Question Contacts</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                {questions.map(question => (
                    <tr key={question.questionId}>
                        <td>{question.questionId}</td>
                        <td>{question.questionName}</td>
                        <td>{question.questionAnnot}</td>
                        <td>
                            <button className={btnClasses.join(' ')}
                                    onClick={()=>handleEditClick(question.questionId)}>edit
                            </button>
                            <button className={btnClasses.join(' ')}
                                    onClick={()=>handleDeleteClick(question.questionId)}
                            >delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={()=>handleCreateClick()}> Create new</button>
            <Modal isOpen={isOpen} toggle={toggle} mode={mode}>
                {mode === "edit" ?(<EditQuestion questionId={selectedId} onEdit={editHandler}/>):
                    mode === "create" ?(<CreateNewQuestion onCreate={createHandler}/>):
                        mode === "delete" ? (<DeleteQuestion questionId={selectedId} onDelete={deleteHandler}/>):(<p>Error</p>)}
            </Modal>
        </div>
    )
    
}