# Home Library Service

## Downloading
Clone this repository :
```
git clone https://github.com/MartaPejkowska/nodejs2023Q2-service.git
```

## Preparing application

change branch to 'part-2'

In terminal write:

```
npm install
```
In a root directory create .env file and copy content from env.example

## Running application

To create container in terminal write:
```
docker-compose up -d
```

To stop and clean container write:
```
docker-compose down --volumes
```
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
