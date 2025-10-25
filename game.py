
class TicTacToe:

    def __init__(self):
        self.board = [' ' for _ in range(9)]
        self.current_winner = None
    
    def print_board(self):
        rows = []
        for i in range(3):
            row = self.board[i*3:(i+1)*3]
            rows.append(row)
        
        for row in rows:
            print('|' + '|'.join(row) + '|')
    
    @staticmethod
    def print_board_nums():
        #0|1|2
        number_board = []
        for j in range(3):
            for i in range(j*3,(j+1)*3):
                number_board.append(str(i))

        for i in range(0, 9, 3):
            row = number_board[i:i+3]
            print('|' + '|'.join(row) + '|')
    
    def available_moves(self):
        moves = []
        for (i, spot) in enumerate (self.board):
            if spot == " ":
                moves.append(i)
        return moves
    
    def empty_squares(self):
        return ' ' in self.board
    
    def empty_squares_num(self):
        return self.board.count(' ')
    
    
    def make_moves(self, square, letter):

        if self.board[square] == ' ':
            self.board[square] = letter
            return True
        return False

    