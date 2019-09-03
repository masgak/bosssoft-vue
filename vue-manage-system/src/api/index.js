import request from '../utils/request';
import { post, put, deletes, get } from '../utils/request'
export const fetchData = (query) => {
    return request({
        url: '/ms/table/list',
        method: 'post',
        data: query
    })
}


/*api接口统一管理 */


//---------------------数据字典api------------------------//
export const loadDictionaries=p=>get('/loadDictionaries',p);
export const queryDictionary=p=>post('/queryDictionary',p);
export const addDictionary=p=>post('/addDictionary',p);
export const deleteDictionaries=p=>post('/delete',p);
export const updateDictionary=p=>post('/updateDictionary',p);


//---------------------题目类别api-----------------------//

export const loadCategories=p=>get('/loadCategories',p);
export const addCategory=p=>post('/addCategory',p);
export const deleteCategories=p=>post('/deleteCategories',p);
export const updateCategory=p=>post('/updateCategory',p);
export const queryCategory=p=>post('/queryCategory',p);

//----------------------题型api------------------------//

export const loadSubjectTypes=p=>get('/loadSubjectTypes',p);
export const addSubjectType=p=>post('/addSubjectType',p);
export const deleteSubjectTypes=p=>post('/deleteSubjectTypes',p);
export const updateSubjectType=p=>post('/updateSubjectType',p);
export const querySubjectType=p=>post('/querySubjectType',p);

//---------------------题目api-----------------------//

export const loadSubjects=p=>get('/loadSubjects',p);
export const addSubject=p=>post('/addSubject',p);
export const deleteSubjects=p=>post('/deleteSubjects',p);
export const updateSubject=p=>post('/updateSubject',p);
export const querySubject=p=>post('/querySubject',p);

//---------------------组卷配置api-----------------------//

export const loadCombExams=p=>get('/combExam',p);
export const addCombExam=p=>post('/combExam',p);
export const deleteCombExams=p=>post('/combExam',p);
export const updateCombExam=p=>post('/combExam',p);
export const queryCombExam=p=>post('/combExam',p);



