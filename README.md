nest js first app
Provide a brief overview of your project. Explain what it does, why it exists, and how it can be useful.

Table of Contents
Installation
Usage
Documentation
Contributing
License
Installation
Explain how users can install and set up your project. Include any prerequisites or dependencies that need to be installed.

bash
Copy code
# Example installation steps
npm install
Usage
Provide instructions on how to use your project. Include code examples and showcase the main features.

bash
Copy code
# Example usage
npm start
Documentation
If your project has detailed documentation, provide a link or details on where users can find it. This could be links to external documentation sources or a docs directory within your repository.

Contributing
Explain how others can contribute to your project. Include guidelines for submitting issues, pull requests, and any specific coding standards or conventions.

License
Specify the license under which your project is distributed.

text
Copy code
MIT License
Acknowledgments
Give credit to any external libraries, tools, or people that have inspired or helped your project.


User Service (user.service.ts)
Constructor
@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>: Injects the UserEntity repository from TypeORM for database operations.
private authService: AuthService: Injects the AuthService for handling authentication-related tasks.
Methods
create(user: User): Observable<User>

Takes a User object as a parameter.
Hashes the password using authService.hashPassword.
Creates a new UserEntity and saves it to the database.
Returns an observable with the created user, excluding the password.
findOne(id: number): Observable<User>

Takes a user ID as a parameter.
Retrieves a user from the database based on the provided ID.
Returns an observable with the user, excluding the password.
findAll(): Observable<User[]>

Retrieves all users from the database.
Returns an observable with an array of users, excluding passwords.
deleteOne(id: number): Observable<any>

Takes a user ID as a parameter.
Deletes a user from the database based on the provided ID.
Returns an observable indicating the success of the deletion.
updateOne(id: number, user: User): Observable<any>

Takes a user ID and a User object as parameters.
Updates a user in the database based on the provided ID.
Returns an observable indicating the success of the update.
login(user: User): Observable<string>

Takes a User object with email and password.
Validates the user's credentials using validateUser and generates a JWT using authService.generateJWT.
Returns an observable with the generated JWT or an error message.
validateUser(email: string, password: string): Observable<User>

Takes an email and password as parameters.
Retrieves a user from the database based on the provided email.
Compares the provided password with the stored hashed password using authService.comparePasswords.
Returns an observable with the user, excluding the password, or throws an error if credentials are incorrect.
findByEmail(email: string): Observable<User>

Takes an email as a parameter.
Retrieves a user from the database based on the provided email.
Returns an observable with the user.
User Controller (user.controller.ts)
Constructor
private userService: UserService: Injects the UserService for handling user-related operations.
Methods
create(user: User): Observable<User>

POST endpoint for creating a new user.
Calls userService.create and returns an observable with the created user or an error message.
login(user: User): Observable<object>

POST endpoint for user login.
Calls userService.login and returns an observable with an object containing the access token or an error message.
findOne(params: any): Observable<User>

GET endpoint for retrieving a user by ID.
Calls userService.findOne and returns an observable with the user.
findAll(): Observable<User[]>

GET endpoint for retrieving all users.
Calls userService.findAll and returns an observable with an array of users.
deleteOne(id: string): Observable<any>

DELETE endpoint for deleting a user by ID.
Calls userService.deleteOne and returns an observable indicating the success of the deletion.
updateOne(id: string, user: User): Observable<any>

PUT endpoint for updating a user by ID.
Calls userService.updateOne and returns an observable indicating the success of the update.
Auth Service (auth.service.ts)
Constructor
private readonly jwtService: JwtService: Injects the JwtService for handling JWT operations.
Methods
generateJWT(user: User): Observable<string>

Takes a User object as a parameter.
Generates a JWT using the jwtService and returns an observable with the JWT.
hashPassword(password: string): Observable<string>

Takes a password as a parameter.
Hashes the password using bcrypt and returns an observable with the hashed password.
comparePasswords(newPassword: string, passwordHash: string): Observable<any>

Takes a new password and a password hash as parameters.
Compares the new password with the stored hashed password using bcrypt.
Returns an observable with the result of the comparison.
Notes
The code utilizes TypeORM for database operations.
JWT is used for authentication.
Bcrypt is used for password hashing and comparison.
JwtAuthGuard (jwt-auth.guard.ts)
Class
JwtAuthGuard: Extends AuthGuard from @nestjs/passport for JWT-based authentication.
Description
This guard is designed to protect routes using JWT-based authentication.
It extends the AuthGuard class and specifies the JWT strategy.
JwtStrategy (jwt.strategy.ts)
Class
JwtStrategy: Extends PassportStrategy from @nestjs/passport for implementing a JWT strategy.
Constructor
configService: ConfigService: Injects the ConfigService for retrieving configuration values.
Description
This strategy is used for decoding and validating JWTs.
It extracts the JWT from the request's Bearer token and uses the provided secret key for verification.
The validate method is invoked with the payload of the verified JWT, and it returns an object with the user property.
RolesGuard (roles.guard.ts)
Class
RolesGuard: Implements CanActivate from @nestjs/common for role-based authorization.
Constructor
userService: UserService: Injects the UserService to retrieve user information.
reflector: Reflector: Injects the Reflector for accessing metadata.
Description
This guard is responsible for role-based authorization.
It checks for the presence of roles metadata attached to the route handler.
If roles are defined, it attempts to match them with the roles of the authenticated user.
Method
canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>:
Checks if roles are defined for the route.
Retrieves the user from the request.
Performs role-based authorization, allowing access if the user has the required roles.
Roles Decorator (roles.decorator.ts)
Function
hasRoles(...roles: string[]): Decorator function using SetMetadata from @nestjs/common.
Description
A decorator function for setting metadata (roles) on route handlers.
Used to specify the roles required to access a particular route.
Applied to route handlers like @hasRoles('Admin').
