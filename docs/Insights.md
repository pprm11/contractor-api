# Insights

## Major Premises
* The main goal of a software is deliving value to the customer
* After delivering value to the customer, It's important to ensure the maintanability and a good architecture
* Short time. I work 13 hours a day in my current company, so I need to do as much productive as possible
* The code should be robust to business changes
* Code should scale horizontally

## Minor premises
* Send code had so much problems
* Send code was really coupled
* The send code had not that much rules implemented
* I don't have access to my custom architecture framework
* It has payments, which implies data racing conditions
*  So many ABAC rules(A client can only view his own contract, etc) detected
## Decisions
* As the sent code is not that big and has so much problems -> I decided to redo it.
* As I don't have access to my framework code and don't have time to create other -> Using public framework -> I decided to use nestjs as the main framework. It has a good architecture, It is a productive tool, and It is good to show hard skills.
* As there is so many abac rules and the code should be robust to changes in this rules ->  I decided to use casl, because It is more scalable as the system ages and have more requirements. It is possible to implement RBAC rules too, custom rules for the users, save the rules on the database and integrate with so many tools.
* It was needed a database Orm easy to inject and I wanted a framework which I never used before in order to increase the value for me of this project and It would be good if the database had some good integrations with zod and casl -> Using prisma
    * I decided to use the view on prisma because This code doesn't go to production and It could be a good oportunity to show some skills.
* All the monetary values are processed internally as a int multiplied by 10000.
    * I used that, because int operations are more perfomatic and more realiable. You can control better the significative figures(https://en.wikipedia.org/wiki/Significant_figures) which give us more control about the precision of our operations. 
    * I user 4 zeroes because the worst case is some prices that need 4 decimal places.
    * I convert back to decimal in dtos and serializers
    * I use a hybrid aproach for the transaction needed on the job payment.
        * I used Optimistic concurrency control and didn't lock the reads and validations. 
        * In order to ensure the concurrency control, I put in the update the restrictions with the id, Which ensured that even It was concurrency, the data still enough to do the transaction. 
        * If one of them were invalid, we rollback and throw an error. 
        * The 3 updates run in parallel using promise.all in order to make the lock time short.
        * This aproach improve the scalibility of the system, as lock tends to be the bottleneck of a app horizontal scalability
* decided to change the price format from ``price: number`` to ``price: {amount: number, currency_code: string}`` because if We want to be international, We need to accept multiples currencies.
    * I did only on the api contracts because We should not have breaking changes on It and We can migrate later on the database if needed and, put, the currency on database by now is premature optimization
## What missed to be done
You can find many to-dos in the code related to micro changes, but there is some macro changes I would did if I had more time:

* I had some doubts about the business rules, some of them were not blocking but one especific blocked my development:
    * "POST /balances/deposit/:userId - Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)" -> 
        * Every way I thought this rule, It had some flaws. Could the client send 2 sequencial deposits of 25% in a way to avoid this restriction? If there is just one job to pay, how can he pay by only depositing 25% of the amount needed?
        * If it was a real show case, I would ask for PO and implement It, but I thought It would be more productive doing the test and writing this doc intead of implementing a non clear rule



* A auth with JWT(if it fits the business rules)
* Move the abac rules to the api folder instead of being bind on casl factory
* Implement CI/CD
* Implement lambda function if our stack uses It or docker
* Implement more unit tests
* Implement integration tests and e2e test in order to have a proporcion of 70% of unit tests, 20% of integration, 10% of e2e
* Used zod or joy in the dtos and serializer
* Add monitoring and observability to the api
* Make better depedency injection
* Use openapi do define better the resources
* Add to this docs a glosary and definition of the models
