# Timesheets SPA

This is a prototype version of timesheets Single Page App which is a part of assignment for course CS5610 as Northeastern Unviersity.

## Design Choices

* Once the site loads up, current session is looked for in the client browser. If the session is found then the user is redirected to the dashboard (worker/manager). If session is not found, then user will be shown a login page, using which they can login and create a new session.
* Specific UI interactions for mangaers are handled by checking the `user_type` stored in the session of react state.
* All the routes for specific user role are protected usign react router. It checks the `user_type` and allows/denies the user to access particular path. On denial to access, user is redirected to the root path. And if the user is logged in then they will be redirected to their dashbaord.
* Based on the current session, navbar displays appropriate links to the pages.
* As every table has association with other table, `view.ex` file for relevant table/schema is modified to send an appropriate response to the user.
* All the ajax requests are handled in the `ajax.js` file. On receiving a response, an action is dispatched to the state so that requested changes can be handled.

### worker
* The Dashboard consists of the timesheets that are previously submitted by the user. They are shown brief details about their timesheet. It contains date and status of the timesheet. To see the complete details of the timesheet, user can click on the 'show timesheet' link.

	#### Worker schema:
	```
	email: string
	name: string
	password_hash: string
	pay: float
	bleong_to: manager
	has_many: timesheets
	```
	* Worker has `belongs_to` association with `manager` to make sure that the worker is shown under the correct manager.
	* Worker has `has_many` association with `timesheets` because a worker can have multiple timesheets.

### Manager
* The dashboard consists of users working under the current manager. So, a manager can view a particular worker and see their timesheet.
* Manager has authority to create a worker. By creating a worker, that manager is assigned to the worker and manager will be able to see the timesheets of that worker.
* Manager has authority to create a job. When manager creates a job, that manager will be responsible for that job.
* The manager can delete a worker in order to revoke their access to the timesheet system.

	### Manager Schema
	```
	email: string
	name: string
	password_hash: string
	has_many: workers
	has_many: jobs
	```
	* Manager has `has_many` association with `workers` because a manager manages many workers but a worker reports to only one manager.
	* Manager has `has_many` association with `jobs` because a manager manages many jobs.

### Timesheets
* Each worker will be able to create exactly one timesheet per day.
* Each timesheet can contain tasks for upto 8 hours.
* Only worker can create a timesheet.
* Only manager can approve a timesheet.
* To create a timesheet, user first needs to select a date for which they want to create a timesheet.
* By doing that, a timesheet is created in the database and id of that timesheet is returned.
* Now, user will be able to enter `tasks` for the timesheet.
	#### Timesheet Schema
	```
	approved: boolean
	date: string
	belongs_to: worker
	has_many: tasks
	```
	* Timesheet has `belongs_to` association with the `worker` to make sure that timesheet is shown in the dashboard of worker.
	* Timesheet has `has_many` association with `task` because each timesheet consists of a bunch of tasks.

### Tasks
* Each task belongs to a worksheet. They provide the details about a specific task that is entered in the worksheet.
* In the front-end worker is given the choice to select from the job codes. That is achieved by getting jobs by sending get request to `/jobs` route and then mapping the response to obtain an array of job codes, which is then fed as option to the `select` input.
* Hours can be increases in the increment of 0.5 i.e half hour.
	#### Task Schema
	```
		hours: float
		job_code: string
		belong_to: timesheet
	```
	* Task has `belongs_to` association with the `timesheet` because a bunch of task make a timesheet.



## Seeds for test

#### Worker
* email: jon@doe.com, password: helloworld

#### Manager
* email: alice@example.com, password: helloworld

