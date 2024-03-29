#include <iostream>
#include <SDL2/SDL.h>
#include <SDL2/SDL2_gfxPrimitives.h>
#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif


using namespace std;

SDL_Window *window;
SDL_Renderer *renderer;

bool handle_events() {
    SDL_Event event;
    SDL_PollEvent(&event);
    if (event.type == SDL_QUIT) {
        return false;
    }
    return true;
}

void run_main_loop() {
#ifdef __EMSCRIPTEN__
    emscripten_set_main_loop([]() { handle_events(); }, 0, true);
#else
    while (handle_events());
#endif
}

int main(int argc, char *argv[]) {
    SDL_Init(SDL_INIT_VIDEO);


    SDL_CreateWindowAndRenderer(300, 300, 0, &window, &renderer);

    SDL_SetRenderDrawColor(renderer, /* RGBA: green */ 0x00, 0x80, 0x00, 0xFF);
    SDL_Rect rect = {.x = 10, .y = 10, .w = 150, .h = 100};
    SDL_RenderFillRect(renderer, &rect);
    SDL_RenderPresent(renderer);

    run_main_loop();

    SDL_DestroyRenderer(renderer);
    SDL_DestroyWindow(window);
    SDL_Quit();

    return 0;
}