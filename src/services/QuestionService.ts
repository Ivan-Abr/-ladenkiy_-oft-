import axios from "axios";
import {IQuestion} from "../models";

const QUESTION_API_URL = 'http://localhost:8080/dm/v1/question';

const QuestionService ={

    getQuestions:()=>{
        return axios.get(QUESTION_API_URL)
    },

    getQuestionById:(questionId: number)=>{
        return axios.get(QUESTION_API_URL+"/"+questionId)
    },

    getMarksByQuestionId:(questionId: number)=>{
        return axios.get(QUESTION_API_URL+"/"+questionId+"/marks")
    },

    editQuestion:(questionId: number, question: IQuestion)=>{
        const data: IQuestion ={
            questionId: questionId,
            questionName: question.questionName,
            questionAnnot: question.questionAnnot,
            marks:question.marks
        }
        return axios.put(QUESTION_API_URL+"/"+questionId, data)
    },

    deleteQuestion:(questionId: number)=>{
        return axios.delete(QUESTION_API_URL+"/"+questionId)
    },

    createQuestion:(question: IQuestion)=>{
        return axios.post(QUESTION_API_URL,question)
    }

}
export default QuestionService