-- local counter, sum = 0, 0
-- repeat
--     print("Enter a number (or 0 to exit:)")
--     local num = io.read("*n")
--     if (num ~= 0) then
--         counter = counter + 1
--         sum = sum + num
--     else
--         local avg = sum / counter
--         print("Average of all " .. counter .. " values is " .. avg)
--     end
-- until (num == 0)
local counter, sum = 0, 0
while (true) do
    print("Enter a number (or 0 to exit:)")
    local num = io.read("*n")
    if (num ~= 0) then
        counter = counter + 1
        sum = sum + num
    else
        break
    end
end

local avg = sum / counter
print("Average of all " .. counter .. " values is " .. avg)

