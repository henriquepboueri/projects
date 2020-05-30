math.randomseed(os.time())

local hero_pos = {math.random(1, 100), math.random(1, 100)}
local pos_found = {}

print("Hero position: " .. (hero_pos[1] .. "," .. hero_pos[2]))

for i = 1, 100000 do
    local counter = 0
    local found = false
    while (true) do
        counter = counter + 1
        local new_pos = {math.random(1, 100), math.random(1, 100)}

        if (new_pos[1] == hero_pos[1] and new_pos[2] == hero_pos[2]) then
            print("It's a match at counter: " .. counter)
            found = true
            table.insert(pos_found, counter)
        end

        if found then break end

    end
end

local sum = 0
for i in ipairs(pos_found) do sum = sum + pos_found[i] end
print(sum / #pos_found)

