#define LED1 12
#define LED2 11
#define LED3 10
#define LED4 9
#define LED5 8
#define LED6 7
#define LED7 6
byte data;
void setup() {
// put your setup code here, to run once:
Serial.begin(9600);
pinMode(LED1, OUTPUT);
digitalWrite(LED1, LOW);
pinMode(LED2, OUTPUT);
digitalWrite(LED2, LOW);
pinMode(LED3, OUTPUT);
digitalWrite(LED3, LOW);
pinMode(LED4, OUTPUT);
digitalWrite(LED4, LOW);
pinMode(LED5, OUTPUT);
digitalWrite(LED5, LOW);
pinMode(LED6, OUTPUT);
digitalWrite(LED6, LOW);
pinMode(LED7, OUTPUT);
digitalWrite(LED7, LOW);
}

void loop() {
// put your main code here, to run repeatedly:
if (Serial.available()) {
int i = Serial.parseInt();

if (i == 1)
{
data = data ^ 1;
digitalWrite(LED1, data);

}
if (i == 2)
{
data = data ^ 1;
digitalWrite(LED2, data);

}
if (i == 3)
{
data = data ^ 1;
digitalWrite(LED3, data);

}
if (i == 4)
{
data = data ^ 1;
}
if (i == 5)
{
data = data ^ 1;
digitalWrite(LED5, data);
}
if (i == 6)
{
data = data ^ 1;
digitalWrite(LED6, data);
}
if (i == 7)
{
data = data ^ 1;
digitalWrite(LED7, data);
}
}
}
