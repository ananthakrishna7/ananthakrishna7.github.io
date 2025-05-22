- Each server provides a standard view of local filesystem; implementation of FS does not matter
- Standardisation helps heterogeneous devices use the NFS
- NFS model - [[Remote File Service]] 

# Implementation
- Instead of local Unix FS interface, interface to VFS - Virtual FS is used
- VFS - access local FS or pass on to NFS client
- [[RPC]] is involved

# File system Model
- Similar to Unix
- Files - sequences of bytes
- Hierarchical organization - naming graph - nodes represent directories and files
- Hark links, symbolic links
- File handles are used
- File attributes
- 