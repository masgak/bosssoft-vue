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
export const deleteDictionaries=p=>post('/deleteDictionaries',p);
export const updateDictionary=p=>post('/updateDictionary',p);


//---------------------题目类别api-----------------------//

export const loadCategories=p=>get('/category',p);
export const addCategory=p=>post('/category',p);
export const deleteCategories=p=>post('/category',p);
export const updateCategory=p=>post('/category',p);
export const queryCategory=p=>post('/category',p);

//----------------------题型api------------------------//

export const loadSubjectTypes=p=>get('/subjectType',p);
export const addSubjectType=p=>post('/subjectType',p);
export const deleteSubjectTypes=p=>post('/subjectType',p);
export const updateSubjectType=p=>post('/subjectType',p);
export const querySubjectType=p=>post('/subjectType',p);

//---------------------题目api-----------------------//

export const loadSubjects=p=>get('/subject',p);
export const addSubject=p=>post('/subject',p);
export const deleteSubjects=p=>post('/subject',p);
export const updateSubject=p=>post('/subject',p);
export const querySubject=p=>post('/subject',p);

//---------------------组卷配置api-----------------------//

export const loadCombExams=p=>get('/combExam',p);
export const addCombExam=p=>post('/combExam',p);
export const deleteCombExams=p=>post('/combExam',p);
export const updateCombExam=p=>post('/combExam',p);
export const queryCombExam=p=>post('/combExam',p);



