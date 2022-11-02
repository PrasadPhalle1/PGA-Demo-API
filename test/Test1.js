import {expect} from 'chai';
import supertest from 'supertest';
const request= supertest('https://gorest.co.in/public-api/');
// const Token='487a098062a75d77699085c5ac3a3e986f1d9a9aac4b8d7ee5eb4550c7f22e1e';
const Token = 'a77db38237e5704c9fe84c1d09ea455e7f88a091e697ade16ce778904ae74bf8'
let userId;
    describe('POST', () => {
        it('/users', () => {
            const data={
                email:`test-${Math.floor(Math.random()*9999)}@mail.com`,
                name :'Test1',
                gender :'female',
                status : 'active',
            };
            request.post('users')
            .set('Authorization',`Bearer ${Token}`)
            .send(data)
            .then((res)=>{
                console.log(res.body);
                expect(res.body.data.email).to.eq(data.email);
                expect(res.body.data.name).to.eq(data.name);
                data.gender='male';
                expect(res.body.data).to.deep.include(data)
                userId=res.body.data.id
            })
        });
    });
    describe('GET', () => {
            it('/user', () => {
        request.get('users?access-token=${Token}').end((err,res)=>{
            console.log('Error found is: ',err);
            console.log(res.body);
            expect(res.body.data).to.not.be.empty;
        // done();
        })
    });
        it('/user/:id', () => {
                    request.get(`users/${userId}`).end((err,res)=>{
                    console.log('Error found is: ',err);
                    console.log(res.body);
        });
        });
        // get filtered data by query parameter
        it ('/users/id', () => {
            request.get('users?access-token= ${Token}&page=5&status=active&gender=female').end((err,res)=>{
                console.log('Error found is: ',err);
                console.log(res.body);
                res.body.data.forEach(data => {
                    expect(data.status).to.eq('active');
                    expect(data.gender).to.eq('female');
                });
                // expect(res.body.data.id).to.be.eql(1);
            });
        });
    });
    describe('PUT', () => {
        it('/users/:id', () => {
            const data={
                status :"Active",
                name :`Aasu ${Math.floor(Math.random()*9999)}`,
            }
            request.put(`users/${userId}`)
            .set('Authorization',`Bearer ${Token}`)
            .send(data)
            .then((res)=>{
                console.log(res.body);
            })
        });
    });
        describe('DELETE', () => {
            it('/users/:id', () => {
            request.delete(`users/${userId}`)
            .set('Authorization',`Bearer ${Token}`)
            .then(res=>{
                expect(res.body.data).to.be.eq(null)
            })
        });
    });