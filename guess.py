import random

def guess(x):

    random_number = random.randint(1, x)
    guess = 0
    while guess != random_number:
        

        guess = int(input(f'Enter a number between 1 and {x}: '))
        if guess < random_number:
            print("Too low")
        elif guess > random_number:
            print("Too high")

    print(f"You have guessed the number {random_number} correctly!")


def computer_guess(x):
    low = 1
    high = x

    feedback = ''
    while feedback != 'c':
        if low > high or high < low:
            print("Seems like inconsistent feedback. Exiting.")
            break
        guess = random.randint(low, high)
        feedback = input(f"Is {guess} too high , too low , or correct ? ").lower()

        if feedback == 'h':
            high = guess - 1
        elif feedback == 'l':
            low = guess + 1 
    print("you have guessed the number correctly ")
computer_guess(10)