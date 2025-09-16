--Steps to use--
Step 1 --> delete __pycache__ migrations folder and db.sqlite3 file
Step 2 --> run command $> python3 manage.py makemigrations
                        $> python3 manage.py makemigrations quizapp
                        $> python3 manage.py makemigrations user
Step 3 --> run command $> python3 manage.py migrate
Step 4 --> run command $> python3 manage.py createsuperuser