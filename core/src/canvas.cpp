#include <vector>
#include <stdint.h>
using namespace std;

struct Color {
    uint8_t r;
    uint8_t g;
    uint8_t b;
};

class Shape {
    public:
        Shape() {};
        virtual ~Shape() {};
        virtual void draw() = 0;
    protected:
        Color fill_color;
        Color stroke_color;
        int stroke_width;
};

class Circle : public Shape {
    public:
        Circle(int radius) : radius(radius) {};
        ~Circle() {};
        void draw();
    private:
        double radius;
        uint8_t r;
        uint8_t g;
        uint8_t b;
};

class Rectangle : public Shape {
    public:
        Rectangle(int width, int height) : width(width), height(height) {};
        virtual ~Rectangle() {};
        void draw();
    private:
        double width;
        double height;
        uint8_t r;
        uint8_t g;
        uint8_t b;
};

class Canvas {
    vector<Shape> shapes;
    vector<pair<double, double>> positions;
    public:
        Canvas();
        ~Canvas();
        void draw();
        void add(Shape shape, double x, double y);
        void updateSurface(double left, double top, double right, double bottom);
};