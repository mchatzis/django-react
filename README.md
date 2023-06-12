# Contents
 1. Set-up (with Docker)
 2. Set-up (no docker)

# Set-up (with Docker)

First, build the image:
```
# make project dir and go into it
mkdir ~/desktop/django-react && cd $_
# clone repo
git clone https://github.com/mchatzis/django-react.git .

# create docker image
docker build -t my_image .

# make sure container runs properly
# i.e. you should see the Django runserver usual output
docker run -it --rm my_image

# Stop container with Ctrl-C
```

Then, mount on local directory and install dependencies:
```
# Spin new container but mount it on the root of our project
docker run -it --rm --mount type=bind,src=`pwd`,target="/usr/src/django-react" --name my_cont my_image

# open second terminal or terminal window
# execute a new shell inside the already running container
docker exec -it my_cont bash

!!inside the shell we just created!!
# migrate, install node modules and compile front-end
python manage.py migrate
npm install
npm run build

Stop container with Ctrl-C (remember container is running in the first terminal session). This should also kill automatically the shell executed session which was running inside the container.
```

Finally, let's publish the ports:
```
Spin again the container and make sure you see the results of our commands (eg. a newly created "node_modules" folder and "db.sqlite3" file). The results should be visible BOTH inside the container and locally!

# To spin container WITH ports published
docker run -it --rm --mount type=bind,src=`pwd`,target="/usr/src/django-react" --name my_cont -p 8000:5000 my_image
```


*The app should be up now. Go to your browser at http://127.0.0.1:8000*


## Local development
Because of the Docker mount, your project root is synced with the docker container project root.
Hence, you can work locally with your preferred IDE and the changes will reflect on the container.
(caution: all files created by the container and copied locally will have root privileges locally,
hence you might either need to change them or use sudo)


# Set-up (no docker)

```
# make project dir and go into it
mkdir ~/desktop/django-react && cd $_
# clone repo
git clone https://github.com/mchatzis/django-react.git .

# Create python venv and activate it
python3 -m venv ./.venv
source ./.venv/bin/activate

# Install requirements.txt
pip install --no-cache-dir -r requirements.txt

# Install npm node modules from package.json and compile
# (needs node 18 installed, for quick installation
# you can check how the dockerfile installs it)
npm install
npm run build

# Django - Migrate (creates db)
python manage.py migrate

# Django - runserver
python manage.py runserver
```

*The app should be up now. Go to your browser at http://127.0.0.1:8000*


