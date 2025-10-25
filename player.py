import random
class Player:
    def __init__(self,letter):
        self.letter = letter 

    def get_move(self, game):
        pass

class HumanPlayer(Player):
    def __init__(self, letter):
        super().__init__(letter)

    def get_move(self, game):
        val = None
        val_square = False
        while not val_square:
            square = input(self.letter + '\ player turn case(0-8)')
            try:
                val = int(square)
                if val not in game.available_moves():
                    raise ValueError
                val_square = True
            except ValueError:
                print("invalid square typo error")

        return val

class RemotePlayer(Player):

    def __init__(self, letter):
        super().__init__(letter)

    def get_move(self, game):
        square = random.choice(game.available_moves())
        return square
