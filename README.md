# Game of Life
This is an implementation of Conway's Game of Life. It is a zero-player game where the outcome of the game is solely determined by an initial state. The Game of Life was conceived by British mathematician John Horton Conway in 1970. It's interesting to see how a relatively simple ruleset can yield complex patterns. Fun fact, the Game of Life is Turing complete.


## The Setup

The game is represented by a grid of N x N size composed of N^2 cells. Each cell can be designated as being 'alive' or 'dead' before the start of the simulation. There are then rules that dictate which cells live and die in each step or subsequent generation of the game state.


## The Rules

Depending on whether a cell is dead or alive and how many neighbors it has determines its state in the next generation.

    For each cell that is alive:
        If it has less than 2 live neighbors, it dies (underpopulation)
        If it has 2 or 3 neighbors, it lives (goldilocks)
        If it has 4 neighbors, it dies (overpopulation)
    For each cell that is dead:
        If it has 3 live neighbors, it becomes alive (reproduction)

And a simplified version of the ruleset:
    Alive and 2-3 neighbors => Alive
    Dead and 3 neighbors => Alive
    Otherwise Dead