print("Inform your current age:")
age = tonumber(io.read())

if (age >= 18) then
    msg = "You can both drink and vote."
elseif (age >= 16) then
    msg = "You can only vote."
else
    msg = "You can't drink nor vote."
end

print(msg)

print("----------------------------------------------------")

print("How many years do you work at the company?")
years = tonumber(io.read())
salary = 4180.66

if (years < 5) then
    bonus = salary * 0.07
else
    bonus = salary * 0.1
end

print("Your bonus is R$" .. bonus)

