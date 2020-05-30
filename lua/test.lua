-- math.randomseed(os.time())
-- local function gen_matrix(N, M)
--     if N == nil or M == nil then return {} end
--     local t = {}
--     for i = 1, N do
--         t[i] = {}
--         for j = 1, M do t[i][j] = math.random(1, 10) end
--     end
--     return t
-- end
-- local t = gen_matrix(nil, 4)
-- for _, v in ipairs(t) do
--     for _, w in ipairs(v) do print(w) end
--     print("\n")
-- end
local meta = {}
local vector3d = {}

-- vector3d.new = function(x, y, z)
--     local v = {x, y, z}
--     return v
-- end
function vector3d.new(x, y, z)
    local v = {x = x, y = y, z = z}
    setmetatable(v, meta)
    return v
end

function vector3d.add(v1, v2)
    return vector3d.new(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z)
end

function vector3d.tostring(v) 
    return "X: " .. v.x 
end


meta.__add = vector3d.add
meta.__tostring = vector3d.tostring

local position = vector3d.new(5.0, 5.0, 5.0)
local velocity = vector3d.new(1.0, 2.0, 3.0)

local result = position + velocity

print(result)

